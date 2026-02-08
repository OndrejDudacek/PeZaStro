<template>
	<article>
		<h3>Detail lokace</h3>
		<ul>
			<li>
				<p>Id: {{ location.id }}</p>
			</li>
			<li>
				<p>Datum vytvoření: {{ new Date(location.createdAt).toLocaleDateString() }}</p>
			</li>
			<li>
				<GenericInput
					type="text"
					label="Ulice:"
					icon="signpost"
					placeholder="Rohová"
					v-model="location.address.street"
					:success="successStates.get('street')"
					@update:model-value="
						saveLocationChange(
							location.id,
							{
								address: { street: location.address.street },
							},
							'street',
						)
					"
				/>
			</li>
			<li>
				<GenericInput
					type="number"
					icon="house"
					label="Číslo domu:"
					placeholder="559"
					v-model="location.address.houseNumber"
					:success="successStates.get('houseNumber')"
					@update:model-value="
						saveLocationChange(
							location.id,
							{
								address: { houseNumber: location.address.houseNumber },
							},
							'houseNumber',
						)
					"
				/>
			</li>
			<li>
				<GenericInput
					type="number"
					icon="mail"
					label="PSČ:"
					placeholder="151 00"
					v-model="location.address.postalCode"
					:success="successStates.get('postalCode')"
					@update:model-value="
						saveLocationChange(
							location.id,
							{
								address: { postalCode: location.address.postalCode },
							},
							'postalCode',
						)
					"
				/>
			</li>
			<li>
				<GenericInput
					type="text"
					icon="location_city"
					label="Město:"
					placeholder="Praha"
					v-model="location.address.city"
					:success="successStates.get('city')"
					@update:model-value="
						saveLocationChange(
							location.id,
							{
								address: { city: location.address.city },
							},
							'city',
						)
					"
				/>
			</li>
			<li>
				<TextArea
					label="Poznámky:"
					v-model="location.note"
					:success="successStates.get('note')"
					@update:model-value="
						saveLocationChange(
							location.id,
							{
								note: location.note,
							},
							'note',
						)
					"
				/>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Smazat lokaci" icon="delete" color="danger" />
		</section>
	</article>
</template>

<script setup lang="ts">
import { locationService } from "@/services/locationService";
import Button from "./Button.vue";
import GenericInput from "./GenericInput.vue";
import TextArea from "./TextArea.vue";
import type { Location, LocationUpdate } from "@/types/Location";
import { ref, watch } from "vue";

const props = defineProps<{
	location: Location;
}>();

const emit = defineEmits<{
	"update:location": [value: Location];
}>();

const location = ref(props.location);
const successStates = ref(new Map<string, boolean>());

watch(
	() => props.location,
	(newLocation) => {
		location.value = newLocation;
	},
);

const saveLocationChange = async (id: string, data: LocationUpdate, fieldName: string) => {
	try {
		const updatedLocation = await locationService.update(id, data);
		location.value = updatedLocation;
		emit("update:location", updatedLocation);
		successStates.value.set(fieldName, true);
		setTimeout(() => {
			successStates.value.set(fieldName, false);
		}, 2000);
	} catch (error) {
		console.error(error);
		successStates.value.set(fieldName, false);
	}
};
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

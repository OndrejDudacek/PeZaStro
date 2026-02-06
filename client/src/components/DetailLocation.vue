<template>
	<article>
		<h3>Detail lokace</h3>
		<ul>
			<li>
				<p>Id: {{ location.id }}</p>
			</li>
			<li>
				<p>Datum vytvoření: {{ new Date(location.createdAt).toLocaleDateString }}</p>
			</li>
			<li>
				<GenericInput
					type="text"
					label="Ulice:"
					placeholder="Rohová"
					v-model="location.address.street"
					@update:model-value="
						saveLocationChange(location.id, {
							address: { street: location.address.street },
						})
					"
				/>
			</li>
			<li>
				<GenericInput
					type="number"
					label="Číslo domu:"
					placeholder="559"
					v-model="location.address.houseNumber"
					@update:model-value="
						saveLocationChange(location.id, {
							address: { houseNumber: location.address.houseNumber },
						})
					"
				/>
			</li>
			<li>
				<GenericInput
					type="text"
					label="PSČ:"
					placeholder="151 00"
					v-model="location.address.postalCode"
					@update:model-value="
						saveLocationChange(location.id, {
							address: { postalCode: location.address.postalCode },
						})
					"
				/>
			</li>
			<li>
				<GenericInput
					type="text"
					label="Město:"
					placeholder="Praha"
					v-model="location.address.city"
					@update:model-value="
						saveLocationChange(location.id, {
							address: { city: location.address.city },
						})
					"
				/>
			</li>
			<li>
				<TextArea
					label="Poznámky:"
					v-model="location.note"
					@update:model-value="
						saveLocationChange(location.id, {
							note: location.note,
						})
					"
				/>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Smazat lokaci" icon="delete" />
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

watch(
	() => props.location,
	(newLocation) => {
		location.value = newLocation;
	},
);

const saveLocationChange = async (id: string, data: LocationUpdate) => {
	try {
		const updatedLocation = await locationService.update(id, data);
		location.value = updatedLocation;
		emit("update:location", updatedLocation);
	} catch (error) {
		console.error(error);
	}
};
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

<template>
	<div id="tableAndDetailWrapper">
		<article>
			<section class="controls">
				<Button icon="add" @click="create" />
			</section>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Ulice a číslo</th>
						<th>Město</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(location, i) in locations"
						:key="i"
						@click="selectLocation(location)"
					>
						<td><IdDisplayer :id="location.id" name="location" shorten /></td>
						<td>
							{{ location.address.houseNumber }} {{ location.address.street }}
						</td>
						<td>{{ location.address.city }}</td>
					</tr>
				</tbody>
			</table>
		</article>
		<DetailLocation
			v-if="selectedLocation"
			:location="selectedLocation"
			:key="selectedLocation.id"
			@update:location="updatedLocation"
			@delete:location="deletedLocation"
		/>
		<CreateLocation v-if="creating" @create:location="createdLocation" />
	</div>
</template>

<script setup lang="ts">
import DetailLocation from "@/components/details/DetailLocation.vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import type { Location } from "@/types/Location";
import { locationService } from "@/services/locationService";
import { useRoute, type LocationQueryValue } from "vue-router";
import router from "@/router/index";
import IdDisplayer from "@/components/IdDisplayer.vue";
import CreateLocation from "@/components/creates/CreateLocation.vue";
import Button from "@/components/Button.vue";

const selectedLocation = ref<Location | null>(null);
const selectLocation = (Location: Location) => {
	router.push({ query: { id: Location.id } });
};
const creating = ref<boolean>(false);
const create = () => {
	router.push({ query: { id: "NEW" } });
};

const route = useRoute();
watch(
	() => route.query.id,
	(newId) => {
		handleQueryId(newId);
	},
);

const handleQueryId = (id: LocationQueryValue | LocationQueryValue[] | undefined) => {
	if (id === "NEW") {
		creating.value = true;
		selectedLocation.value = null;
	} else if (id && locations.value) {
		creating.value = false;
		selectedLocation.value = locations.value.find((c) => c.id === id) || null;
	} else {
		creating.value = false;
		selectedLocation.value = null;
	}
};

const createdLocation = async () => {
	router.push({ query: {} });
	await fetchLocations();
};

const updatedLocation = (updatedLocation: Location) => {
	if (locations.value) {
		const index = locations.value.findIndex((c) => c.id === updatedLocation.id);
		if (index !== -1) {
			locations.value[index] = updatedLocation;
		}
	}
	selectedLocation.value = updatedLocation;
};

const deletedLocation = async () => {
	router.push({ query: { id: undefined } });
	await fetchLocations();
};

const locations = ref<Location[]>([]);
const fetchLocations = async () => {
	try {
		locations.value = await locationService.getAll();
		if (route.query.id) {
			selectedLocation.value =
				locations.value.find((c) => c.id === route.query.id) || null;
		}
	} catch (error) {
		console.error(error);
	}
};

const handleEscape = (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		router.push({ query: { id: undefined } });
	}
};

onMounted(async () => {
	await fetchLocations();
	handleQueryId(route.query.id);
	window.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleEscape);
});
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include tableAndDetail;
</style>

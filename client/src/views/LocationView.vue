<template>
	<div id="tableAndDetailWrapper">
		<article>
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
			@update:location="updatedLocation"
			@delete:location="deletedLocation"
		/>
	</div>
</template>

<script setup lang="ts">
import DetailLocation from "@/components/DetailLocation.vue";
import { onMounted, ref, watch } from "vue";
import type { Location } from "@/types/Location";
import { locationService } from "@/services/locationService";
import { useRoute } from "vue-router";
import router from "@/router/index";
import IdDisplayer from "@/components/IdDisplayer.vue";

const selectedLocation = ref<Location | null>(null);
const selectLocation = (Location: Location) => {
	router.push({ query: { id: Location.id } });
};

const route = useRoute();
watch(
	() => route.query.id,
	(newId) => {
		if (newId && locations.value) {
			selectedLocation.value = locations.value.find((c) => c.id === newId) || null;
		} else {
			selectedLocation.value = null;
		}
	},
);

const updatedLocation = (updatedLocation: Location) => {
	if (locations.value) {
		const index = locations.value.findIndex((c) => c.id === updatedLocation.id);
		if (index !== -1) {
			locations.value[index] = updatedLocation;
		}
	}
	selectedLocation.value = updatedLocation;
};

const deletedLocation = () => {
	router.push({ query: { id: undefined } });
	fetchLocations();
};

const locations = ref<Location[]>([]);
const fetchLocations = async () => {
	try {
		locations.value = await locationService.getAll();
	} catch (error) {
		console.error(error);
	}
};

onMounted(async () => {
	await fetchLocations();
});
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include tableAndDetail;
</style>

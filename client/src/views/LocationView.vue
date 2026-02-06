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
						<td>{{ location.id }}</td>
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
		/>
	</div>
</template>

<script setup lang="ts">
import DetailLocation from "@/components/DetailLocation.vue";
import { ref } from "vue";
import type { Location } from "@/types/Location";
import { locationService } from "@/services/locationService";

const selectedLocation = ref<Location | null>(null);
const selectLocation = (data: Location) => {
	selectedLocation.value = data;
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

const locations = ref<Location[]>([]);
try {
	locations.value = await locationService.getAll();
} catch (error) {
	console.error(error);
}
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include tableAndDetail;
</style>

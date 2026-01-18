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
						@click="selectLocation(location.id)"
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
		<DetailLocation v-if="selectedLocationId" :location-id="selectedLocationId" />
	</div>
</template>

<script setup lang="ts">
import DetailLocation from "@/components/DetailLocation.vue";
import { ref } from "vue";

const selectedLocationId = ref<String | null>(null);
const selectLocation = (id: string) => {
	selectedLocationId.value = id;
};

const locations = [
	{
		id: "297952af-579d-4de4-8923-3a8b8cdf8361",
		address: {
			street: "Bažantnice",
			houseNumber: 369,
			postalCode: "121 00",
			city: "Poděbrady",
		},
		customerId: "297952af-579d-4de4-8923-3a8b8cdf8361",
		note: "blbá prijezdova cesta",
	},
];
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;

@include tableAndDetail;
</style>

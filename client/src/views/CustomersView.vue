<template>
	<div id="tableAndDetailWrapper">
		<article>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Jméno</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(customer, i) in customers"
						:key="i"
						@click="selectCustomer(customer.id)"
					>
						<td>{{ customer.id }}</td>
						<td>{{ customer.name }}</td>
					</tr>
				</tbody>
			</table>
		</article>
		<DetailCustomer v-if="selectedCustomerId" :customer-id="selectedCustomerId" />
	</div>
</template>

<script setup lang="ts">
import DetailCustomer from "@/components/DetailCustomer.vue";
import { ref } from "vue";

const selectedCustomerId = ref<String | null>(null);
const selectCustomer = (id: string) => {
	selectedCustomerId.value = id;
};

const customers = [
	{
		id: "7bc6f73a-5b6d-471b-b93c-70b5b29aeec1",
		createdAt: "2026-01-18T13:11:22.187Z",
		name: "Jiří novák",
		note: "fuuh tezka prace",
	},
];
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;

@include tableAndDetail;
</style>

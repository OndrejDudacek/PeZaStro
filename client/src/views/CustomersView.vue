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
						@click="selectCustomer(customer)"
					>
						<td>{{ customer.id }}</td>
						<td>{{ customer.name }}</td>
					</tr>
				</tbody>
			</table>
		</article>
		<DetailCustomer
			v-if="selectedCustomer"
			:customer="selectedCustomer"
			@update:customer="updateCustomer"
		/>
	</div>
</template>

<script setup lang="ts">
import DetailCustomer from "@/components/DetailCustomer.vue";
import { customerService } from "@/services/customerService";
import type { Customer } from "@/types/Customer";
import { ref } from "vue";

const selectedCustomer = ref<Customer | null>(null);
const selectCustomer = (customer: Customer) => {
	selectedCustomer.value = customer;
};

const updateCustomer = (updatedCustomer: Customer) => {
	if (customers.value) {
		const index = customers.value.findIndex((c) => c.id === updatedCustomer.id);
		if (index !== -1) {
			customers.value[index] = updatedCustomer;
		}
	}
	selectedCustomer.value = updatedCustomer;
};

const customers = ref<Customer[] | null>([]);
try {
	customers.value = await customerService.getAll();
} catch (error) {
	console.error(error);
}
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include tableAndDetail;
</style>

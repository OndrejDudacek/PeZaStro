<template>
	<div id="tableAndDetailWrapper">
		<article>
			<section class="controls">
				<Button icon="add" />
			</section>
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
						<td><IdDisplayer :id="customer.id" name="customer" shorten /></td>
						<td>{{ customer.name }}</td>
					</tr>
				</tbody>
			</table>
		</article>
		<DetailCustomer
			v-if="selectedCustomer"
			:customer="selectedCustomer"
			:key="selectedCustomer.id"
			@update:customer="updatedCustomer"
			@delete:customer="deletedCustomer"
		/>
	</div>
</template>

<script setup lang="ts">
import DetailCustomer from "@/components/details/DetailCustomer.vue";
import router from "@/router";
import { customerService } from "@/services/customerService";
import type { Customer } from "@/types/Customer";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import IdDisplayer from "@/components/IdDisplayer.vue";

const selectedCustomer = ref<Customer | null>(null);
const selectCustomer = (customer: Customer) => {
	router.push({ query: { id: customer.id } });
};

const route = useRoute();
watch(
	() => route.query.id,
	(newId) => {
		if (newId && customers.value) {
			selectedCustomer.value = customers.value.find((c) => c.id === newId) || null;
		} else {
			selectedCustomer.value = null;
		}
	},
);

const updatedCustomer = (updatedCustomer: Customer) => {
	if (customers.value) {
		const index = customers.value.findIndex((c) => c.id === updatedCustomer.id);
		if (index !== -1) {
			customers.value[index] = updatedCustomer;
		}
	}
	selectedCustomer.value = updatedCustomer;
};

const deletedCustomer = async () => {
	router.push({ query: { id: undefined } });
	fetchCustomers();
};

const customers = ref<Customer[] | null>([]);
const fetchCustomers = async () => {
	try {
		customers.value = await customerService.getAll();
		if (route.query.id) {
			selectedCustomer.value =
				customers.value.find((c) => c.id === route.query.id) || null;
		}
	} catch (error) {
		console.error(error);
	}
};

onMounted(async () => {
	await fetchCustomers();
});
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include tableAndDetail;
</style>

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
		<CustomerDetail
			v-if="selectedCustomer"
			:customer="selectedCustomer"
			:key="selectedCustomer.id"
			@update:customer="updatedCustomer"
			@delete:customer="deletedCustomer"
		/>
		<CustomerCreate v-if="creating" @create:customer="createdCustomer" />
	</div>
</template>

<script setup lang="ts">
import CustomerDetail from "@/components/details/CustomerDetail.vue";
import router from "@/router";
import { customerService } from "@/services/customerService";
import type { Customer } from "@/types/Customer";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, type LocationQueryValue } from "vue-router";
import IdDisplayer from "@/components/IdDisplayer.vue";
import CustomerCreate from "@/components/creates/CustomerCreate.vue";
import Button from "@/components/Button.vue";

const selectedCustomer = ref<Customer | null>(null);
const selectCustomer = (customer: Customer) => {
	router.push({ query: { id: customer.id } });
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
		selectedCustomer.value = null;
	} else if (id && customers.value) {
		creating.value = false;
		selectedCustomer.value = customers.value.find((c) => c.id === id) || null;
	} else {
		creating.value = false;
		selectedCustomer.value = null;
	}
};

const createdCustomer = async () => {
	router.push({ query: {} });
	await fetchCustomers();
};

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

const handleEscape = (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		router.push({ query: { id: undefined } });
	}
};

onMounted(async () => {
	await fetchCustomers();
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

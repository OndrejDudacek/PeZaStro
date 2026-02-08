<template>
	<article>
		<h3>Detail zákazníka</h3>
		<ul>
			<li>
				<p>Id: {{ customer.id }}</p>
			</li>
			<li>
				<p>Datum vytvoření: {{ new Date(customer.createdAt).toLocaleDateString() }}</p>
			</li>
			<li>
				<GenericInput
					type="text"
					icon="person"
					label="Jméno:"
					placeholder="Jan Nezdar"
					v-model="customer.name"
					:success="successStates.get('name')"
					@debounced:model-value="
						saveCustomerChange(customer.id, { name: customer.name }, 'name')
					"
				/>
			</li>
			<li>
				<TextArea
					label="Poznámky:"
					v-model="customer.note"
					:success="successStates.get('note')"
					@debounced:model-value="
						saveCustomerChange(customer.id, { note: customer.note }, 'note')
					"
				/>
			</li>
		</ul>
		<h4>Kontakty:</h4>
		<ul>
			<!-- v-for="(customers, i) in customer" :key="i" -->
			<li>
				<ul>
					<li>
						<p>Id: {{}}</p>
					</li>
					<li>
						<p>Datum vytvoření: {{}}</p>
					</li>
					<li>
						<GenericInput
							type="text"
							icon="person"
							label="Jméno:"
							placeholder="Josefína Nezdarová"
						/>
					</li>
					<li>
						<GenericInput
							type="tel"
							icon="phone"
							label="Telefon:"
							placeholder="777666111"
						/>
					</li>
					<li>
						<GenericInput
							type="email"
							icon="email"
							label="Email:"
							placeholder="josefina.nezdarova@gmail.com"
						/>
					</li>
				</ul>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Přidat kontakt" icon="add" />
			<Button label="Smazat kontakt" icon="delete" color="danger" />
		</section>
		<section class="buttons">
			<Button label="Smazat zakázku" icon="delete" color="danger" />
		</section>
	</article>
</template>

<script setup lang="ts">
import type { Customer, CustomerUpdate } from "@/types/Customer";
import Button from "./Button.vue";
import GenericInput from "./GenericInput.vue";
import TextArea from "./TextArea.vue";
import { ref, watch } from "vue";
import { customerService } from "@/services/customerService";

const emit = defineEmits<{
	"update:customer": [value: Customer];
}>();

const props = defineProps<{
	customer: Customer;
}>();

const successStates = ref(new Map<string, boolean>());
const customer = ref(props.customer);

watch(
	() => props.customer,
	(newCustomer) => {
		customer.value = newCustomer;
	},
);

const saveCustomerChange = async (id: string, data: CustomerUpdate, fieldName: string) => {
	try {
		const updatedCustomer = await customerService.update(id, data);
		customer.value = updatedCustomer;
		emit("update:customer", updatedCustomer);
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

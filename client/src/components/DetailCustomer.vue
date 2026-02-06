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
					label="Jméno:"
					placeholder="Jan Nezdar"
					v-model="customer.name"
					@update:model-value="
						saveCustomerChange(customer.id, { name: customer.name })
					"
				/>
			</li>
			<li>
				<TextArea
					label="Poznámky:"
					v-model="customer.note"
					@update:model-value="
						saveCustomerChange(customer.id, { note: customer.note })
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
							label="Jméno:"
							placeholder="Josefína Nezdarová"
						/>
					</li>
					<li>
						<GenericInput type="number" label="Telefon:" placeholder="777666111" />
					</li>
					<li>
						<GenericInput
							type="text"
							label="Email:"
							placeholder="josefina.nezdarova@gmail.com"
						/>
					</li>
				</ul>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Přidat kontakt" icon="add" />
			<Button label="Smazat kontakt" icon="delete" />
		</section>
		<section class="buttons">
			<Button label="Smazat zakázku" icon="delete" />
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

const customer = ref(props.customer);

watch(
	() => props.customer,
	(newCustomer) => {
		customer.value = newCustomer;
	},
);

const saveCustomerChange = async (id: string, data: CustomerUpdate) => {
	try {
		const updatedCustomer = await customerService.update(id, data);
		customer.value = updatedCustomer;
		emit("update:customer", updatedCustomer);
	} catch (error) {
		console.error(error);
	}
};
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

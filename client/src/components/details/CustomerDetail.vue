<template>
	<article>
		<h3>Detail zákazníka</h3>
		<ul>
			<li>
				<p>Id: <IdDisplayer :id="customer.id" copy /></p>
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
					empty-as-null
				/>
			</li>
		</ul>
		<h4>Kontakty:</h4>
		<ul>
			<li v-for="(contact, i) in contacts" :key="i">
				<ContactDetail
					:contact="contact"
					@delete:contact="deletedContact"
					@update:contact="updatedContact"
					:key="contact.id"
				/>
			</li>
			<li v-if="creatingContact">
				<ContactCreate
					:customer-id="customer.id"
					@cancel:contact="canceledContactCreation"
					@create:contact="createdContact"
				/>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Přidat kontakt" icon="add" @click="create" />
		</section>
		<section class="buttons">
			<Button
				label="Smazat zakázku"
				icon="delete"
				color="danger"
				@click="deleteCustomer(customer.id)"
			/>
		</section>
	</article>
</template>

<script setup lang="ts">
import type { Customer, CustomerUpdate } from "@/types/Customer";
import Button from "../Button.vue";
import GenericInput from "../GenericInput.vue";
import TextArea from "../TextArea.vue";
import { onMounted, ref, watch } from "vue";
import { customerService } from "@/services/customerService";
import IdDisplayer from "../IdDisplayer.vue";
import type { Contact } from "@/types/Contact";
import { contactService } from "@/services/contactService";
import ContactDetail from "./ContactDetail.vue";
import ContactCreate from "../creates/ContactCreate.vue";

const creatingContact = ref<boolean>(false);
const create = () => {
	creatingContact.value = true;
};

const emit = defineEmits<{
	"update:customer": [];
	"delete:customer": [];
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
		emit("update:customer");
		successStates.value.set(fieldName, true);
		setTimeout(() => {
			successStates.value.set(fieldName, false);
		}, 2000);
	} catch (error) {
		alert(error);
		console.error(error);
		successStates.value.set(fieldName, false);
	}
};

const deleteCustomer = async (id: string) => {
	try {
		const { message } = await customerService.delete(id);
		emit("delete:customer");
		alert(message);
	} catch (error) {
		alert(error);
		console.error(error);
	}
};

const contacts = ref<Contact[]>([]);
const fetchContacts = async () => {
	try {
		contacts.value = await contactService.getAll(customer.value.id);
	} catch (error) {
		console.error(error);
	}
};

const createdContact = async () => {
	creatingContact.value = false;
	await fetchContacts();
};

const canceledContactCreation = async () => {
	creatingContact.value = false;
};

const updatedContact = async () => {
	await fetchContacts();
};

const deletedContact = async () => {
	await fetchContacts();
};

onMounted(async () => {
	await fetchContacts();
});
</script>

<style scoped lang="scss">
@use "../../assets/mixins" as *;
@include detailStyling;
</style>

<template>
	<article>
		<h3>Detail zákazníka</h3>
		<ul>
			<li>
				<p>Id: <IdDisplayer :id="customer.id" name="customer" copy /></p>
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
			<li v-for="(contact, i) in contacts" :key="i">
				<ul>
					<li>
						<p>Id: <IdDisplayer :id="contact.id" name="customer" copy /></p>
					</li>
					<li>
						<p>Datum vytvoření: {{ contact.createdAt }}</p>
					</li>
					<li>
						<GenericInput
							type="text"
							icon="person"
							label="Jméno:"
							placeholder="Josefína Nezdarová"
							v-model="contact.name"
							:success="successStates.get(`contact-name-${contact.id}`)"
							@debounced:model-value="
								updatedContact(
									contact.id,
									{ name: contact.name },
									`contact-name-${contact.id}`,
								)
							"
						/>
					</li>
					<li>
						<GenericInput
							type="tel"
							icon="phone"
							label="Telefon:"
							placeholder="777666111"
							:model-value="contact.phone ?? ''"
							@update:model-value="contact.phone = $event ? +$event : null"
							:success="successStates.get(`contact-phone-${contact.id}`)"
							@debounced:model-value="
								updatedContact(
									contact.id,
									{ phone: contact.phone },
									`contact-phone-${contact.id}`,
								)
							"
						/>
					</li>
					<li>
						<GenericInput
							type="email"
							icon="email"
							label="Email:"
							placeholder="josefina.nezdarova@gmail.com"
							:model-value="contact.email ?? ''"
							@update:model-value="
								contact.email = $event ? String($event) : null
							"
							:success="successStates.get(`contact-email-${contact.id}`)"
							@debounced:model-value="
								updatedContact(
									contact.id,
									{ email: contact.email },
									`contact-email-${contact.id}`,
								)
							"
						/>
					</li>
					<li>
						<section class="buttons">
							<Button
								label="Smazat kontakt"
								icon="delete"
								color="danger"
								@click="deleteContact(contact)"
							/>
						</section>
					</li>
				</ul>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Přidat kontakt" icon="add" />
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
import Button from "./Button.vue";
import GenericInput from "./GenericInput.vue";
import TextArea from "./TextArea.vue";
import { compile, onMounted, ref, watch } from "vue";
import { customerService } from "@/services/customerService";
import IdDisplayer from "./IdDisplayer.vue";
import type { Contact, ContactUpdate } from "@/types/Contact";
import { contactService } from "@/services/contactService";

const emit = defineEmits<{
	"update:customer": [value: Customer];
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

const deleteCustomer = async (id: string) => {
	try {
		const { message } = await customerService.delete(id);
		emit("delete:customer");
		alert(message);
	} catch (error) {
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

const updatedContact = async (id: string, data: ContactUpdate, fieldName: string) => {
	try {
		const updatedContact = await contactService.update(id, data);
		const index = contacts.value.findIndex((jd) => jd.id === id);
		if (index !== -1) {
			contacts.value[index] = updatedContact;
		}
		successStates.value.set(fieldName, true);
		setTimeout(() => {
			successStates.value.set(fieldName, false);
		}, 2000);
	} catch (error) {
		console.error(error);
		successStates.value.set(fieldName, false);
	}
};

const deleteContact = async (contact: Contact) => {
	try {
		const { message } = await contactService.delete(contact.id);
		contacts.value = contacts.value.filter((c) => c.id !== contact.id);
		alert(message);
	} catch (error) {
		console.error(error);
	}
};

onMounted(async () => {
	await fetchContacts();
});
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

<template>
	<ul>
		<li>
			<p>Id: <IdDisplayer :id="contact.id" copy /></p>
		</li>
		<li>
			<p>Datum vytvoření: {{ new Date(contact.createdAt).toLocaleDateString() }}</p>
		</li>
		<li>
			<GenericInput
				type="text"
				icon="person"
				label="Jméno:"
				placeholder="Josefína Nezdarová"
				v-model="contact.name"
				:success="successStates.get(`name`)"
				@debounced:model-value="
					updateContact(contact.id, { name: contact.name }, `name`)
				"
			/>
		</li>
		<li>
			<GenericInput
				type="tel"
				icon="phone"
				label="Telefon:"
				placeholder="777666111"
				v-model="contact.phone"
				:success="successStates.get(`phone`)"
				@debounced:model-value="
					updateContact(contact.id, { phone: contact.phone }, `phone`)
				"
				empty-as-null
			/>
		</li>
		<li>
			<GenericInput
				type="email"
				icon="email"
				label="Email:"
				placeholder="josefina.nezdarova@gmail.com"
				v-model="contact.email"
				:success="successStates.get(`email`)"
				@debounced:model-value="
					updateContact(contact.id, { email: contact.email }, `email`)
				"
				empty-as-null
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
</template>

<script setup lang="ts">
import { contactService } from "@/services/contactService";
import type { Contact, ContactUpdate } from "@/types/Contact";
import { ref, watch } from "vue";
import IdDisplayer from "../IdDisplayer.vue";
import Button from "../Button.vue";
import GenericInput from "../GenericInput.vue";

const emit = defineEmits<{
	"update:contact": [];
	"delete:contact": [];
}>();

const props = defineProps<{
	contact: Contact;
}>();

const successStates = ref(new Map<string, boolean>());
const contact = ref(props.contact);

watch(
	() => props.contact,
	(newContact) => {
		contact.value = newContact;
	},
);

const updateContact = async (id: string, data: ContactUpdate, fieldName: string) => {
	try {
		await contactService.update(id, data);
		emit("update:contact");
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

const deleteContact = async (contact: Contact) => {
	try {
		const { message } = await contactService.delete(contact.id);
		emit("delete:contact");
		alert(message);
	} catch (error) {
		alert(error);
		console.error(error);
	}
};
</script>

<style scoped lang="scss">
@use "../../assets/mixins" as *;
@include detailStyling;
</style>

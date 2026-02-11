<template>
	<article>
		<ul>
			<li>
				<p>Id: Nový kontakt</p>
			</li>
			<li>
				<GenericInput
					type="text"
					icon="person"
					label="Jméno:"
					placeholder="Josefína Nezdarová"
					v-model="contact.name"
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
				/>
			</li>
			<li>
				<GenericInput
					type="email"
					icon="email"
					label="Email:"
					placeholder="josefina.nezdarova@gmail.com"
					:model-value="contact.email ?? ''"
					@update:model-value="contact.email = $event ? String($event) : null"
				/>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Vytvořit kontakt" icon="save" @click="save" />
			<Button label="Zrušit tvorbu" icon="delete" color="danger" @click="cancel" />
		</section>
	</article>
</template>

<script setup lang="ts">
import { contactService } from "@/services/contactService";
import type { ContactCreate } from "@/types/Contact";
import { ref } from "vue";
import Button from "../Button.vue";
import GenericInput from "../GenericInput.vue";

const emit = defineEmits<{
	"create:contact": [];
	"cancel:contact": [];
}>();

const props = defineProps<{
	customerId: string;
}>();

const contact = ref<ContactCreate>({
	name: "",
	customerId: props.customerId,
	phone: undefined,
	email: undefined,
});

const cancel = () => {
	emit("cancel:contact");
};

const save = async () => {
	try {
		await contactService.create(contact.value);
		emit("create:contact");
		alert("Vytvořeno");
	} catch (error) {
		console.error(error);
	}
};
</script>

<style scoped lang="scss">
@use "../../assets/mixins" as *;
@include detailStyling;
</style>

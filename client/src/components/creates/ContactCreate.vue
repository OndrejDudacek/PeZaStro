<template>
	<article>
		<form @submit.prevent="save">
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
						required
					/>
				</li>
				<li>
					<GenericInput
						type="number"
						icon="phone"
						label="Telefon:"
						placeholder="777666111"
						:model-value="contact.phone ?? ''"
						@update:model-value="contact.phone = $event ? +$event : null"
						optional
						min="100000000"
						max="999999999"
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
						optional
					/>
				</li>
			</ul>
			<section class="buttons">
				<Button label="Vytvořit kontakt" icon="save" type="submit" />
				<Button label="Zrušit tvorbu" icon="delete" color="danger" @click="cancel" />
			</section>
		</form>
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

const contact = ref<Partial<ContactCreate>>({
	name: undefined,
	customerId: props.customerId,
	phone: undefined,
	email: undefined,
});

const cancel = () => {
	emit("cancel:contact");
};

const save = async () => {
	try {
		const payload = contact.value as ContactCreate;
		await contactService.create(payload);
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

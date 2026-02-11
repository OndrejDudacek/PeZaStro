<template>
	<article>
		<form @submit.prevent="save">
			<h3>Tvorba zákazníka</h3>
			<ul>
				<li>
					<GenericInput
						type="text"
						icon="person"
						label="Jméno:"
						placeholder="Jan Nezdar"
						v-model="customer.name"
						required
					/>
				</li>
				<li>
					<TextArea label="Poznámky:" v-model="customer.note" optional />
				</li>
			</ul>
			<section class="buttons">
				<Button label="Vytvořit zákazníka" icon="save" type="submit" />
				<Button label="Zrušit tvorbu" icon="delete" color="danger" @click="cancel" />
			</section>
		</form>
	</article>
</template>

<script setup lang="ts">
import type { CustomerCreate } from "@/types/Customer";
import Button from "../Button.vue";
import GenericInput from "../GenericInput.vue";
import TextArea from "../TextArea.vue";
import { ref } from "vue";
import router from "@/router";
import { customerService } from "@/services/customerService";

const emit = defineEmits<{
	"create:customer": [];
}>();

const customer = ref<Partial<CustomerCreate>>({
	name: undefined,
	note: undefined,
});

const cancel = () => {
	router.push({ query: {} });
};

const save = async () => {
	try {
		const payload = customer.value as CustomerCreate;
		await customerService.create(payload);
		emit("create:customer");
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

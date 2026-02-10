<template>
	<article>
		<h3>Tvorba zákazníka</h3>
		<ul>
			<li>
				<GenericInput
					type="text"
					icon="person"
					label="Jméno:"
					placeholder="Jan Nezdar"
					v-model="customer.name"
				/>
			</li>
			<li>
				<TextArea label="Poznámky:" v-model="customer.note" />
			</li>
		</ul>
		<section class="buttons">
			<Button label="Vytvořit zákazníka" icon="save" @click="save" />
			<Button label="Zrušit tvorbu" icon="delete" color="danger" @click="cancel" />
		</section>
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

const customer = ref<CustomerCreate>({
	name: "",
	note: null,
});

const cancel = () => {
	router.push({ query: {} });
};

const save = async () => {
	try {
		if (customer.value.note === "") customer.value.note = undefined;
		await customerService.create(customer.value);
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

<template>
	<article>
		<form @submit.prevent="save">
			<h3>Tvorba lokace</h3>
			<ul>
				<li>
					<SelectInput
						label="Zákazník:"
						v-model="location.customerId"
						:options="optionsList"
						required
					/>
				</li>
				<li>
					<GenericInput
						type="text"
						label="Ulice:"
						icon="signpost"
						placeholder="Rohová"
						v-model="location.address.street"
						required
					/>
				</li>
				<li>
					<GenericInput
						type="number"
						icon="house"
						label="Číslo domu:"
						placeholder="559"
						v-model="location.address.houseNumber"
						required
					/>
				</li>
				<li>
					<GenericInput
						type="number"
						icon="mail"
						label="PSČ:"
						placeholder="151 00"
						v-model="location.address.postalCode"
						required
					/>
				</li>
				<li>
					<GenericInput
						type="text"
						icon="location_city"
						label="Město:"
						placeholder="Praha"
						v-model="location.address.city"
						required
					/>
				</li>
				<li>
					<TextArea label="Poznámky:" v-model="location.note" optional />
				</li>
			</ul>
			<section class="buttons">
				<Button label="Vytvořit lokaci" icon="save" type="submit" />
				<Button label="Zrušit tvorbu" icon="delete" color="danger" @click="cancel" />
			</section>
		</form>
	</article>
</template>

<script setup lang="ts">
import { locationService } from "@/services/locationService";
import Button from "../Button.vue";
import GenericInput from "../GenericInput.vue";
import TextArea from "../TextArea.vue";
import type { LocationCreate } from "@/types/Location";
import { computed, onMounted, ref } from "vue";
import router from "@/router";
import SelectInput, { type Option } from "../SelectInput.vue";
import type { Customer } from "@/types/Customer";
import { customerService } from "@/services/customerService";

const emit = defineEmits<{
	"create:location": [];
}>();

const location = ref<
	Partial<Omit<LocationCreate, "address">> & {
		address: Partial<LocationCreate["address"]>;
	}
>({
	address: {
		street: undefined,
		houseNumber: undefined,
		postalCode: undefined,
		city: undefined,
	},
	customerId: undefined,
	note: undefined,
});

const cancel = () => {
	router.push({ query: {} });
};

const save = async () => {
	try {
		const payload = location.value as LocationCreate;
		await locationService.create(payload);
		emit("create:location");
		alert("Vytvořeno");
	} catch (error) {
		console.error(error);
	}
};

const customers = ref<Customer[]>([]);
const fetchCustomers = async () => {
	try {
		customers.value = await customerService.getAll();
	} catch (error) {
		console.error(error);
	}
};

const optionsList = computed(() => {
	const options: Option[] = [];
	for (const customer of customers.value) {
		options.push({ label: customer.name, value: customer.id });
	}
	return options;
});

onMounted(async () => {
	await fetchCustomers();
});
</script>

<style scoped lang="scss">
@use "../../assets/mixins" as *;
@include detailStyling;
</style>

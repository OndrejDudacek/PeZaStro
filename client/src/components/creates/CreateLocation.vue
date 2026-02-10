<template>
	<article>
		<h3>Tvorba lokace</h3>
		<ul>
			<li>
				<SelectInput
					label="Zákazník:"
					v-model="location.customerId"
					:options="optionsList"
				/>
			</li>
			<li>
				<GenericInput
					type="text"
					label="Ulice:"
					icon="signpost"
					placeholder="Rohová"
					v-model="location.address.street"
				/>
			</li>
			<li>
				<GenericInput
					type="number"
					icon="house"
					label="Číslo domu:"
					placeholder="559"
					v-model="location.address.houseNumber"
				/>
			</li>
			<li>
				<GenericInput
					type="number"
					icon="mail"
					label="PSČ:"
					placeholder="151 00"
					v-model="location.address.postalCode"
				/>
			</li>
			<li>
				<GenericInput
					type="text"
					icon="location_city"
					label="Město:"
					placeholder="Praha"
					v-model="location.address.city"
				/>
			</li>
			<li>
				<TextArea label="Poznámky:" v-model="location.note" />
			</li>
		</ul>
		<section class="buttons">
			<Button label="Vytvořit lokaci" icon="save" @click="save" />
			<Button label="Zrušit tvorbu" icon="delete" color="danger" @click="cancel" />
		</section>
	</article>
</template>

<script setup lang="ts">
import { locationService } from "@/services/locationService";
import Button from "../Button.vue";
import GenericInput from "../GenericInput.vue";
import TextArea from "../TextArea.vue";
import type { Location, LocationCreate } from "@/types/Location";
import { computed, onMounted, ref } from "vue";
import router from "@/router";
import SelectInput, { type Option } from "../SelectInput.vue";
import type { Customer } from "@/types/Customer";
import { customerService } from "@/services/customerService";

const emit = defineEmits<{
	"create:location": [value: Location];
}>();

const location = ref<LocationCreate>({
	address: {
		street: "",
		houseNumber: 0,
		postalCode: 11100,
		city: "",
	},
	customerId: "",
	note: "",
});

const cancel = () => {
	router.push({ query: {} });
};

const save = async () => {
	try {
		if (location.value.note === "") location.value.note = undefined;
		const response = await locationService.create(location.value);
		emit("create:location", response);
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

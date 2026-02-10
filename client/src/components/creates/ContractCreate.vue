<template>
	<article>
		<h3>Tvorba zakázky</h3>
		<ul>
			<li>
				<SelectInput
					label="Lokace:"
					v-model="contract.locationId"
					:options="optionsList"
				/>
			</li>
			<li>
				<GenericInput
					type="number"
					label="Celková cena:"
					v-model="contract.totalCost"
				/>
			</li>
			<li>
				<p>Datum podepsání:</p>
				<section class="dateInputs">
					<GenericInput type="number" label="Den:" v-model="signingDay" />
					<GenericInput type="number" label="Měsíc:" v-model="signingMonth" />
					<GenericInput type="number" label="Rok:" v-model="signingYear" />
				</section>
			</li>
			<li>
				<TextArea label="Poznámky:" v-model="contract.note" />
			</li>
		</ul>
		<section class="buttons">
			<section class="buttons">
				<Button label="Vytvořit zakázku" icon="save" @click="save" />
				<Button label="Zrušit tvorbu" icon="delete" color="danger" @click="cancel" />
			</section>
		</section>
	</article>
</template>

<script setup lang="ts">
import Button from "../Button.vue";
import GenericInput from "../GenericInput.vue";
import TextArea from "../TextArea.vue";
import SelectInput, { type Option } from "../SelectInput.vue";
import type { ContractCreate } from "@/types/Contract";
import { computed, onMounted, ref } from "vue";
import { contractService } from "@/services/contractService";
import type { Location } from "@/types/Location";
import { locationService } from "@/services/locationService";
import router from "@/router";

const emit = defineEmits<{
	"create:contract": [];
}>();

const contract = ref<ContractCreate>({
	totalCost: 0,
	dateOfSigning: new Date(Date.now()),
	locationId: "",
	note: null,
});

const signingDate = new Date(contract.value.dateOfSigning);
const signingDay = ref(signingDate.getDate());
const signingMonth = ref(signingDate.getMonth() + 1);
const signingYear = ref(signingDate.getFullYear());

const convertToDate = (day: number, month: number, year: number) => {
	const date = new Date(year, month - 1, day);
	return date;
};

const cancel = () => {
	router.push({ query: {} });
};

const save = async () => {
	try {
		if (contract.value.note === "") contract.value.note = undefined;
		contract.value.dateOfSigning = convertToDate(
			signingDay.value,
			signingMonth.value,
			signingYear.value,
		);
		await contractService.create(contract.value);
		emit("create:contract");
		alert("Vytvořeno");
	} catch (error) {
		console.error(error);
	}
};

const locations = ref<Location[]>([]);
const fetchLocations = async () => {
	try {
		locations.value = await locationService.getAll();
	} catch (error) {
		console.error(error);
	}
};

const optionsList = computed(() => {
	const options: Option[] = [];
	for (const location of locations.value) {
		options.push({
			label: `${location.address.houseNumber} ${location.address.street} ${location.address.city}`,
			value: location.id,
		});
	}
	return options;
});

onMounted(async () => {
	await fetchLocations();
});
</script>

<style scoped lang="scss">
@use "../../assets/mixins.scss" as *;
@include detailStyling;
</style>

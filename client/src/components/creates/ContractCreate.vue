<template>
	<article>
		<form @submit.prevent="save">
			<h3>Tvorba zakázky</h3>
			<ul>
				<li>
					<SelectInput
						label="Lokace:"
						v-model="contract.locationId"
						:options="optionsList"
						required
					/>
				</li>
				<li>
					<GenericInput
						type="number"
						label="Celková cena:"
						v-model="contract.totalCost"
						required
						min="0"
					/>
				</li>
				<li>
					<p>Datum podepsání:</p>
					<section class="dateInputs">
						<GenericInput
							type="number"
							label="Den:"
							v-model="signingDay"
							required
							min="1"
							max="31"
						/>
						<GenericInput
							type="number"
							label="Měsíc:"
							v-model="signingMonth"
							required
							min="1"
							max="12"
						/>
						<GenericInput
							type="number"
							label="Rok:"
							v-model="signingYear"
							required
							min="1990"
							max="2222"
						/>
					</section>
				</li>
				<li>
					<TextArea label="Poznámky:" v-model="contract.note" optional />
				</li>
			</ul>
			<section class="buttons">
				<section class="buttons">
					<Button label="Vytvořit zakázku" icon="save" type="submit" />
					<Button
						label="Zrušit tvorbu"
						icon="delete"
						color="danger"
						@click="cancel"
					/>
				</section>
			</section>
		</form>
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

const contract = ref<Partial<ContractCreate>>({
	totalCost: undefined,
	dateOfSigning: undefined,
	locationId: undefined,
	note: undefined,
});

const signingDate = new Date(contract.value.dateOfSigning || Date.now());
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
		const payload = contract.value as ContractCreate;
		payload.dateOfSigning = convertToDate(
			signingDay.value,
			signingMonth.value,
			signingYear.value,
		);
		await contractService.create(payload);
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

<template>
	<article>
		<h3>Detail zakázky</h3>
		<ul>
			<li>
				<p>Id: {{ contract.id }}</p>
			</li>
			<li>
				<p>Datum vytvoření: {{ new Date(contract.createdAt).toLocaleDateString() }}</p>
			</li>
			<li>
				<p>Celková cena: {{ contract.totalCost }} Kč</p>
			</li>
			<li>
				<p>Datum podepsání:</p>
				<section class="dateInputs">
					<GenericInput
						type="number"
						label="Den:"
						v-model="signingDay"
						@update:model-value="
							saveContractChange(contract.id, {
								dateOfSigning: convertToDate(
									signingDay,
									signingMonth,
									signingYear,
								),
							})
						"
					/>
					<GenericInput
						type="number"
						label="Měsíc:"
						v-model="signingMonth"
						@update:model-value="
							saveContractChange(contract.id, {
								dateOfSigning: convertToDate(
									signingDay,
									signingMonth,
									signingYear,
								),
							})
						"
					/>
					<GenericInput
						type="number"
						label="Rok:"
						v-model="signingYear"
						@update:model-value="
							saveContractChange(contract.id, {
								dateOfSigning: convertToDate(
									signingDay,
									signingMonth,
									signingYear,
								),
							})
						"
					/>
				</section>
			</li>
			<li>
				<TextArea
					label="Poznámky:"
					v-model="contract.note"
					@update:model-value="
						saveContractChange(contract.id, {
							note: contract.note,
						})
					"
				/>
			</li>
		</ul>
		<h4>Popisy práce:</h4>
		<ul>
			<!-- v-for="(jobDesc, i) in jobDescs" :key="i" -->
			<li>
				<ul>
					<li>
						<p>Id: {{}}</p>
					</li>
					<li>
						<p>Datum vytvoření: {{}}</p>
					</li>
					<li>
						<GenericInput type="text" label="Jméno:" placeholder="Sekání trávy" />
					</li>
					<li>
						<p>Cena: {{}}</p>
					</li>
					<li>
						<SelectInput
							name="frequency"
							label="Frekvence:"
							:options="[
								{ label: 'Měsíčně', value: 'month' },
								{ label: 'Ročně', value: 'year' },
							]"
						/>
					</li>
					<li>
						<GenericInput type="number" label="Perioda:" />
					</li>
				</ul>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Smazat zakázku" icon="delete" />
			<Button label="Přidat popis práce" icon="add" />
		</section>
		<h4>Záznamy prací:</h4>
		<ul>
			<!-- v-for="(job, i) in jobs" :key="i" -->
			<li></li>
		</ul>
		<section class="buttons">
			<Button label="Smazat zakázku" icon="delete" />
		</section>
	</article>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import GenericInput from "./GenericInput.vue";
import TextArea from "./TextArea.vue";
import SelectInput from "./SelectInput.vue";
import type { Contract, ContractUpdate } from "@/types/Contract";
import { ref, watch } from "vue";
import { contractService } from "@/services/contractService";

const props = defineProps<{
	contract: Contract;
}>();

const emit = defineEmits<{
	"update:contract": [value: Contract];
}>();

const contract = ref(props.contract);
const signingDate = new Date(contract.value.dateOfSigning);
const signingDay = ref(signingDate.getDate());
const signingMonth = ref(signingDate.getMonth() + 1);
const signingYear = ref(signingDate.getFullYear());

const convertToDate = (day: number, month: number, year: number) => {
	const date = new Date(year, month - 1, day);
	return date;
};

watch(
	() => props.contract,
	(newContract) => {
		contract.value = newContract;
	},
);

const saveContractChange = async (id: string, data: ContractUpdate) => {
	try {
		const updatedContract = await contractService.update(id, data);
		contract.value = updatedContract;
		emit;
	} catch (error) {
		console.error(error);
	}
};

const jobDescs = ref([]);
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

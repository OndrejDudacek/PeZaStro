<template>
	<article>
		<h3>Detail zakázky</h3>
		<ul>
			<li>
				<p>Id: <IdDisplayer :id="contract.id" name="contract" copy /></p>
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
						:success="successStates.get('day')"
						@debounced:model-value="
							saveContractChange(
								contract.id,
								{
									dateOfSigning: convertToDate(
										signingDay,
										signingMonth,
										signingYear,
									),
								},
								'day',
							)
						"
					/>
					<GenericInput
						type="number"
						label="Měsíc:"
						v-model="signingMonth"
						:success="successStates.get('month')"
						@debounced:model-value="
							saveContractChange(
								contract.id,
								{
									dateOfSigning: convertToDate(
										signingDay,
										signingMonth,
										signingYear,
									),
								},
								'month',
							)
						"
					/>
					<GenericInput
						type="number"
						label="Rok:"
						v-model="signingYear"
						:success="successStates.get('year')"
						@debounced:model-value="
							saveContractChange(
								contract.id,
								{
									dateOfSigning: convertToDate(
										signingDay,
										signingMonth,
										signingYear,
									),
								},
								'year',
							)
						"
					/>
				</section>
			</li>
			<li>
				<TextArea
					label="Poznámky:"
					v-model="contract.note"
					:success="successStates.get('note')"
					@debounced:model-value="
						saveContractChange(
							contract.id,
							{
								note: contract.note,
							},
							'note',
						)
					"
				/>
			</li>
		</ul>
		<h4>Popisy práce:</h4>
		<ul>
			<li v-for="(jobDesc, i) in jobDescs" :key="i">
				<ul>
					<li>
						<p>
							Id: <IdDisplayer :id="jobDesc.contractId" name="contract" copy />
						</p>
					</li>
					<li>
						<p>
							Datum vytvoření:
							{{ new Date(jobDesc.createdAt).toLocaleDateString() }}
						</p>
					</li>
					<li>
						<GenericInput
							type="text"
							icon="item"
							label="Jméno:"
							placeholder="Sekání trávy"
							v-model="jobDesc.name"
						/>
					</li>
					<li>
						<GenericInput
							type="number"
							icon="money"
							label="Cena:"
							placeholder="400"
							v-model="jobDesc.cost"
						/>
					</li>
					<li>
						<SelectInput
							name="frequency"
							label="Frekvence:"
							:options="[
								{ label: 'Měsíčně', value: Frequency.month },
								{ label: 'Ročně', value: Frequency.year },
							]"
							v-model="jobDesc.frequency"
						/>
					</li>
					<li>
						<GenericInput
							type="number"
							label="Perioda:"
							:model-value="jobDesc.period === null ? 0 : jobDesc.period"
							@update:model-value="jobDesc.period = Number($event)"
						/>
					</li>
				</ul>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Smazat zakázku" icon="delete" color="danger" />
			<Button label="Přidat popis práce" icon="add" />
		</section>
		<h4>Záznamy prací:</h4>
		<ul>
			<li v-for="(job, i) in jobs" :key="i">
				{{ new Date(job.date).toLocaleDateString() }}
				<IdDisplayer :id="job.id" name="job" link />
			</li>
		</ul>
		<section class="buttons">
			<Button
				label="Smazat zakázku"
				icon="delete"
				color="danger"
				@click="deleteContract(contract.id)"
			/>
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
import IdDisplayer from "./IdDisplayer.vue";
import { Frequency, type JobDescription } from "@/types/JobDescription";
import type { Job } from "@/types/Job";

const props = defineProps<{
	contract: Contract;
}>();

const emit = defineEmits<{
	"update:contract": [value: Contract];
	"delete:contract": [];
}>();

const successStates = ref(new Map<string, boolean>());
const contract = ref<Contract>(props.contract);

watch(
	() => props.contract,
	(newContract) => {
		contract.value = newContract;
	},
);

const signingDate = new Date(contract.value.dateOfSigning);
const signingDay = ref(signingDate.getDate());
const signingMonth = ref(signingDate.getMonth() + 1);
const signingYear = ref(signingDate.getFullYear());

const convertToDate = (day: number, month: number, year: number) => {
	const date = new Date(year, month - 1, day);
	return date;
};

const saveContractChange = async (id: string, data: ContractUpdate, fieldName: string) => {
	try {
		const updatedContract = await contractService.update(id, data);
		contract.value = updatedContract;
		emit("update:contract", updatedContract);
		successStates.value.set(fieldName, true);
		setTimeout(() => {
			successStates.value.set(fieldName, false);
		}, 2000);
	} catch (error) {
		console.error(error);
		successStates.value.set(fieldName, false);
	}
};

const deleteContract = async (id: string) => {
	try {
		const { message } = await contractService.delete(id);
		emit("delete:contract");
		alert(message);
	} catch (error) {
		console.error(error);
	}
};

const jobDescs = ref<JobDescription[]>([]);
const jobs = ref<Job[]>([]);
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

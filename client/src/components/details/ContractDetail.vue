<template>
	<article>
		<h3>Detail zakázky</h3>
		<ul>
			<li>
				<p>Id: <IdDisplayer :id="contract.id" copy /></p>
			</li>
			<li>
				<p>Datum vytvoření: {{ new Date(contract.createdAt).toLocaleDateString() }}</p>
			</li>
			<li>
				<GenericInput
					type="number"
					label="Celková cena:"
					v-model="contract.totalCost"
					:success="successStates.get('totalCost')"
					@debounced:model-value="
						saveContractChange(
							contract.id,
							{
								totalCost: contract.totalCost,
							},
							'totalCost',
						)
					"
				/>
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
					empty-as-null
				/>
			</li>
		</ul>
		<h4>Popisy práce:</h4>
		<ul>
			<li v-for="(jobDesc, i) in jobDescs" :key="i">
				<JobDescriptionDetail
					:job-description="jobDesc"
					@update:job-description="updatedJobDesc"
					@delete:job-description="deletedJobDesc"
				/>
			</li>
			<li>
				<JobDescriptionCreate
					v-if="creatingJobDesc"
					:contract-id="contract.id"
					@create:job-description="createdJobDesc"
					@cancel:job-description="canceledJobDescCreation"
				/>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Přidat popis práce" icon="add" @click="create" />
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
import Button from "../Button.vue";
import GenericInput from "../GenericInput.vue";
import TextArea from "../TextArea.vue";
import type { Contract, ContractUpdate } from "@/types/Contract";
import { onMounted, ref, watch } from "vue";
import { contractService } from "@/services/contractService";
import IdDisplayer from "../IdDisplayer.vue";
import { type JobDescription } from "@/types/JobDescription";
import type { Job } from "@/types/Job";
import { jobDescriptionService } from "@/services/jobDescriptionService";
import { jobService } from "@/services/jobService";
import JobDescriptionDetail from "./JobDescriptionDetail.vue";
import JobDescriptionCreate from "../creates/JobDescriptionCreate.vue";

const creatingJobDesc = ref<boolean>(false);
const create = () => {
	creatingJobDesc.value = true;
};

const emit = defineEmits<{
	"update:contract": [];
	"delete:contract": [];
}>();

const props = defineProps<{
	contract: Contract;
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
		emit("update:contract");
		successStates.value.set(fieldName, true);
		setTimeout(() => {
			successStates.value.set(fieldName, false);
		}, 2000);
	} catch (error) {
		alert(error);
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
		alert(error);
		console.error(error);
	}
};

const jobDescs = ref<JobDescription[]>([]);
const fetchJobDescs = async () => {
	try {
		jobDescs.value = await jobDescriptionService.getAll(contract.value.id);
	} catch (error) {
		console.error(error);
	}
};

const createdJobDesc = async () => {
	creatingJobDesc.value = false;
	await fetchJobDescs();
};

const canceledJobDescCreation = async () => {
	creatingJobDesc.value = false;
};

const updatedJobDesc = async () => {
	await fetchJobDescs();
};

const deletedJobDesc = async () => {
	await fetchJobDescs();
};
const jobs = ref<Job[]>([]);
const fetchJobs = async () => {
	try {
		jobs.value = await jobService.getAll(contract.value.id);
	} catch (error) {
		console.error(error);
	}
};

onMounted(async () => {
	await fetchJobDescs();
	await fetchJobs();
});
</script>

<style scoped lang="scss">
@use "../../assets/mixins.scss" as *;
@include detailStyling;
</style>

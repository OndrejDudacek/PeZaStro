<template>
	<ul>
		<li>
			<p>Id: <IdDisplayer :id="jobDesc.id" copy /></p>
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
				icon="assignment"
				label="Jméno:"
				placeholder="Sekání trávy"
				v-model="jobDesc.name"
				:success="successStates.get(`name`)"
				@debounced:model-value="
					updateJobDesc(jobDesc.id, { name: jobDesc.name }, `name`)
				"
			/>
		</li>
		<li>
			<GenericInput
				type="number"
				icon="payments"
				label="Cena:"
				placeholder="400"
				v-model="jobDesc.cost"
				:success="successStates.get(`cost`)"
				@debounced:model-value="
					updateJobDesc(jobDesc.id, { cost: jobDesc.cost }, `cost`)
				"
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
				:success="successStates.get(`frequency`)"
				@debounced:model-value="
					updateJobDesc(jobDesc.id, { frequency: jobDesc.frequency }, `frequency`)
				"
			/>
		</li>
		<li>
			<GenericInput
				type="number"
				label="Perioda:"
				:model-value="jobDesc.period === null ? 0 : jobDesc.period"
				@update:model-value="jobDesc.period = Number($event)"
				:success="successStates.get(`period`)"
				@debounced:model-value="
					updateJobDesc(jobDesc.id, { period: jobDesc.period }, `period`)
				"
			/>
		</li>
		<li>
			<section class="buttons">
				<Button
					label="Smazat popis práce"
					icon="delete"
					color="danger"
					@click="deleteJobDesc(jobDesc)"
				/>
			</section>
		</li>
	</ul>
</template>

<script setup lang="ts">
import {
	Frequency,
	type JobDescription,
	type JobDescriptionUpdate,
} from "@/types/JobDescription";
import { ref, watch } from "vue";
import IdDisplayer from "../IdDisplayer.vue";
import Button from "../Button.vue";
import GenericInput from "../GenericInput.vue";
import { jobDescriptionService } from "@/services/jobDescriptionService";
import SelectInput from "../SelectInput.vue";

const emit = defineEmits<{
	"update:jobDescription": [];
	"delete:jobDescription": [];
}>();

const props = defineProps<{
	jobDescription: JobDescription;
}>();

const successStates = ref(new Map<string, boolean>());
const jobDesc = ref(props.jobDescription);

watch(
	() => props.jobDescription,
	(newJobDescription) => {
		jobDesc.value = newJobDescription;
	},
);

const updateJobDesc = async (id: string, data: JobDescriptionUpdate, fieldName: string) => {
	try {
		await jobDescriptionService.update(id, data);
		emit("update:jobDescription");
		successStates.value.set(fieldName, true);
		setTimeout(() => {
			successStates.value.set(fieldName, false);
		}, 2000);
	} catch (error) {
		console.error(error);
		successStates.value.set(fieldName, false);
	}
};

const deleteJobDesc = async (jobdescription: JobDescription) => {
	try {
		const { message } = await jobDescriptionService.delete(jobdescription.id);
		emit("delete:jobDescription");
		alert(message);
	} catch (error) {
		console.error(error);
	}
};
</script>

<style scoped lang="scss">
@use "../../assets/mixins" as *;
@include detailStyling;
</style>

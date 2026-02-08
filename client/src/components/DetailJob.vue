<template>
	<article>
		<h3>Detail práce</h3>
		<ul>
			<li>
				<p>Id: {{ job.id }}</p>
			</li>
			<li>
				<p>Datum vytvoření: {{ new Date(job.createdAt).toLocaleDateString() }}</p>
			</li>
			<li>
				<p>Datum provedení:</p>
				<section class="dateInputs">
					<GenericInput
						type="number"
						label="Den:"
						v-model="day"
						@update:model-value="
							saveJobChange(job.id, { date: convertToDate(day, month, year) })
						"
					/>
					<GenericInput
						type="number"
						label="Měsíc:"
						v-model="month"
						@update:model-value="
							saveJobChange(job.id, { date: convertToDate(day, month, year) })
						"
					/>
					<GenericInput
						type="number"
						label="Rok:"
						v-model="year"
						@update:model-value="
							saveJobChange(job.id, { date: convertToDate(day, month, year) })
						"
					/>
				</section>
			</li>
			<li>
				<p>Id zakázky: {{ job.contractId }}</p>
			</li>
			<li>
				<TextArea
					label="Poznámky:"
					v-model="job.note"
					@update:model-value="saveJobChange(job.id, { note: job.note })"
				/>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Smazat práci" icon="delete" color="danger" />
		</section>
	</article>
</template>

<script setup lang="ts">
import type { Job, JobUpdate } from "@/types/Job";
import Button from "./Button.vue";
import GenericInput from "./GenericInput.vue";
import TextArea from "./TextArea.vue";
import { jobService } from "@/services/jobService";
import { ref, watch } from "vue";

const props = defineProps<{
	job: Job;
}>();

const emit = defineEmits<{
	"update:job": [value: Job];
}>();

const job = ref(props.job);
const date = new Date(job.value.date);
const day = ref(date.getDate());
const month = ref(date.getMonth() + 1);
const year = ref(date.getFullYear());

const convertToDate = (day: number, month: number, year: number) => {
	const date = new Date(year, month - 1, day);
	return date;
};

watch(
	() => props.job,
	(newJob) => {
		job.value = newJob;
	},
);

const saveJobChange = async (id: string, data: JobUpdate) => {
	try {
		const updatedJob = await jobService.update(id, data);
		job.value = updatedJob;
		emit("update:job", updatedJob);
	} catch (error) {
		console.error(error);
	}
};
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

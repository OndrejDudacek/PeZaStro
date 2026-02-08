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
						icon="calendar_view_day"
						label="Den:"
						v-model="day"
						:success="successStates.get('day')"
						min="1"
						max="31"
						@debounced:model-value="
							saveJobChange(
								job.id,
								{ date: convertToDate(day, month, year) },
								'day',
							)
						"
					/>
					<GenericInput
						type="number"
						icon="calendar_view_month"
						label="Měsíc:"
						v-model="month"
						:success="successStates.get('month')"
						min="1"
						max="12"
						@debounced:model-value="
							saveJobChange(
								job.id,
								{ date: convertToDate(day, month, year) },
								'month',
							)
						"
					/>
					<GenericInput
						type="number"
						icon="calendar_month"
						label="Rok:"
						v-model="year"
						:success="successStates.get('year')"
						@debounced:model-value="
							saveJobChange(
								job.id,
								{ date: convertToDate(day, month, year) },
								'year',
							)
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
					:success="successStates.get('note')"
					@debounced:model-value="saveJobChange(job.id, { note: job.note }, 'note')"
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

const successStates = ref(new Map<string, boolean>());
const job = ref(props.job);

watch(
	() => props.job,
	(newJob) => {
		job.value = newJob;
	},
);

const date = new Date(job.value.date);
const day = ref(date.getDate());
const month = ref(date.getMonth() + 1);
const year = ref(date.getFullYear());

const convertToDate = (day: number, month: number, year: number) => {
	const date = new Date(year, month - 1, day);
	return date;
};

const saveJobChange = async (id: string, data: JobUpdate, fieldName: string) => {
	try {
		const updatedJob = await jobService.update(id, data);
		job.value = updatedJob;
		emit("update:job", updatedJob);
		successStates.value.set(fieldName, true);
		setTimeout(() => {
			successStates.value.set(fieldName, false);
		}, 2000);
	} catch (error) {
		console.error(error);
		successStates.value.set(fieldName, false);
	}
};
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

<template>
	<div id="tableAndDetailWrapper">
		<article>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Datum</th>
						<th>Id zakázky</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(job, i) in jobs" :key="i" @click="selectJob(job)">
						<td>{{ job.id }}</td>
						<td>{{ new Date(job.date).toLocaleDateString() }}</td>
						<td>{{ job.contractId }}</td>
					</tr>
				</tbody>
			</table>
		</article>
		<DetailJob v-if="selectedJob" :job="selectedJob" @update:job="updatedJob" />
	</div>
</template>

<script setup lang="ts">
import DetailJob from "@/components/DetailJob.vue";
import { jobService } from "@/services/jobService";
import type { Job } from "@/types/Job";
import { ref } from "vue";

const selectedJob = ref<Job | null>(null);
const selectJob = (job: Job) => {
	selectedJob.value = job;
};

const updatedJob = (updatedJob: Job) => {
	if (jobs.value) {
		const index = jobs.value.findIndex((c) => c.id === updatedJob.id);
		if (index !== -1) {
			jobs.value[index] = updatedJob;
		}
	}
	selectedJob.value = updatedJob;
};

const jobs = ref<Job[]>([]);
try {
	jobs.value = await jobService.getAll();
} catch (error) {
	console.error(error);
}
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include tableAndDetail;
</style>

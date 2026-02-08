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
		<DetailJob
			v-if="selectedJob"
			:job="selectedJob"
			@update:job="updatedJob"
			@delete:job="deletedJob"
		/>
	</div>
</template>

<script setup lang="ts">
import DetailJob from "@/components/DetailJob.vue";
import router from "@/router";
import { jobService } from "@/services/jobService";
import type { Job } from "@/types/Job";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const selectedJob = ref<Job | null>(null);
const selectJob = (job: Job) => {
	router.push({ query: { id: job.id } });
};

const route = useRoute();
watch(
	() => route.query.id,
	(newId) => {
		if (newId && jobs.value) {
			selectedJob.value = jobs.value.find((c) => c.id === newId) || null;
		} else {
			selectedJob.value = null;
		}
	},
);

const updatedJob = (updatedJob: Job) => {
	if (jobs.value) {
		const index = jobs.value.findIndex((c) => c.id === updatedJob.id);
		if (index !== -1) {
			jobs.value[index] = updatedJob;
		}
	}
	selectedJob.value = updatedJob;
};

const deletedJob = () => {
	router.push({ query: { id: undefined } });
	fetchJobs();
};

const jobs = ref<Job[]>([]);

const fetchJobs = async () => {
	try {
		jobs.value = await jobService.getAll();
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	fetchJobs();
});
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include tableAndDetail;
</style>

<template>
	<div id="tableAndDetailWrapper">
		<article>
			<section class="controls">
				<Button icon="add" />
			</section>
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
						<td><IdDisplayer :id="job.id" name="job" shorten /></td>
						<td>{{ new Date(job.date).toLocaleDateString() }}</td>
						<td>
							<IdDisplayer :id="job.contractId" name="contract" shorten link />
						</td>
					</tr>
				</tbody>
			</table>
		</article>
		<DetailJob
			v-if="selectedJob"
			:job="selectedJob"
			:key="selectedJob.id"
			@update:job="updatedJob"
			@delete:job="deletedJob"
		/>
	</div>
</template>

<script setup lang="ts">
import DetailJob from "@/components/details/DetailJob.vue";
import router from "@/router";
import { jobService } from "@/services/jobService";
import type { Job } from "@/types/Job";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import IdDisplayer from "@/components/IdDisplayer.vue";

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
		if (route.query.id) {
			selectedJob.value = jobs.value.find((c) => c.id === route.query.id) || null;
		}
	} catch (error) {
		console.error(error);
	}
};

onMounted(async () => {
	await fetchJobs();
});
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include tableAndDetail;
</style>

<template>
	<div id="tableAndDetailWrapper">
		<article>
			<section class="controls">
				<Button icon="add" @click="create" />
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
		<JobDetail
			v-if="selectedJob"
			:job="selectedJob"
			:key="selectedJob.id"
			@update:job="updatedJob"
			@delete:job="deletedJob"
		/>
		<JobCreate v-if="creating" @create:job="createdJob" />
	</div>
</template>

<script setup lang="ts">
import JobDetail from "@/components/details/JobDetail.vue";
import router from "@/router";
import { jobService } from "@/services/jobService";
import type { Job } from "@/types/Job";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, type LocationQueryValue } from "vue-router";
import IdDisplayer from "@/components/IdDisplayer.vue";
import Button from "@/components/Button.vue";
import JobCreate from "@/components/creates/JobCreate.vue";

const selectedJob = ref<Job | null>(null);
const selectJob = (job: Job) => {
	router.push({ query: { id: job.id } });
};
const creating = ref<boolean>(false);
const create = () => {
	router.push({ query: { id: "NEW" } });
};

const route = useRoute();
watch(
	() => route.query.id,
	(newId) => {
		handleQueryId(newId);
	},
);

const handleQueryId = (id: LocationQueryValue | LocationQueryValue[] | undefined) => {
	if (id === "NEW") {
		creating.value = true;
		selectedJob.value = null;
	} else if (id && jobs.value) {
		creating.value = false;
		selectedJob.value = jobs.value.find((c) => c.id === id) || null;
	} else {
		creating.value = false;
		selectedJob.value = null;
	}
};

const createdJob = async () => {
	router.push({ query: {} });
	await fetchJobs();
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

const handleEscape = (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		router.push({ query: { id: undefined } });
	}
};

onMounted(async () => {
	await fetchJobs();
	handleQueryId(route.query.id);
	window.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleEscape);
});
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include tableAndDetail;
</style>

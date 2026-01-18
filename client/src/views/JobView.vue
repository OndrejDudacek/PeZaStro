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
					<tr v-for="(job, i) in jobs" :key="i" @click="selectJob(job.id)">
						<td>{{ job.id }}</td>
						<td>{{ job.date }}</td>
						<td>{{ job.contractId }}</td>
					</tr>
				</tbody>
			</table>
		</article>
		<DetailJob v-if="selectedJobId" :job-id="selectedJobId" />
	</div>
</template>

<script setup lang="ts">
import DetailJob from "@/components/DetailJob.vue";
import { ref } from "vue";

const selectedJobId = ref<String | null>(null);
const selectJob = (id: string) => {
	selectedJobId.value = id;
};

const jobs = [
	{
		id: "aisnfdans-sdf-sdf-sdf-13234F",
		date: "2025-04-12T14:52:03.064Z",
		contractId: "297952af-579d-4de4-8923-3a8b8cdf8361",
		note: "fuuh tezka prace",
	},
];
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;

@include tableAndDetail;
</style>

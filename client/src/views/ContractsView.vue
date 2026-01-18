<template>
	<div id="tableAndDetailWrapper">
		<article>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Cena</th>
						<th>Datum podpisu</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(contract, i) in contracts"
						:key="i"
						@click="selectContract(contract.id)"
					>
						<td>{{ contract.id }}</td>
						<td>{{ contract.totalCost }}</td>
						<td>{{ contract.dateOfSigning }}</td>
					</tr>
				</tbody>
			</table>
		</article>
		<DetailContract v-if="selectedContractId" :contract-id="selectedContractId" />
	</div>
</template>

<script setup lang="ts">
import DetailContract from "@/components/DetailContract.vue";
import { ref } from "vue";

const selectedContractId = ref<String | null>(null);
const selectContract = (id: string) => {
	selectedContractId.value = id;
};

const contracts = [
	{
		id: "7bc6f73a-5b6d-471b-b93c-70b5b29aeec1",
		createdAt: "2026-01-18T13:11:22.187Z",
		totalCost: 1000,
		dateOfSigning: "2025-04-12T14:52:03.064Z",
		locationId: "nejakyId",
		note: "fuuh tezka prace",
	},
];
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;

@include tableAndDetail;
</style>

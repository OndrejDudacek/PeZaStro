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
						@click="selectContract(contract)"
					>
						<td>{{ contract.id }}</td>
						<td>{{ contract.totalCost }}</td>
						<td>{{ contract.dateOfSigning }}</td>
					</tr>
				</tbody>
			</table>
		</article>
		<DetailContract
			v-if="selectedContract"
			:contract="selectedContract"
			@update:contract="updatedContract"
		/>
	</div>
</template>

<script setup lang="ts">
import DetailContract from "@/components/DetailContract.vue";
import { contractService } from "@/services/contractService";
import type { Contract } from "@/types/Contract";
import { ref } from "vue";

const selectedContract = ref<Contract | null>(null);
const selectContract = (contract: Contract) => {
	selectedContract.value = contract;
};

const updatedContract = (updatedContract: Contract) => {
	if (contracts.value) {
		const index = contracts.value.findIndex((c) => c.id === updatedContract.id);
		if (index !== -1) {
			contracts.value[index] = updatedContract;
		}
	}
	selectedContract.value = updatedContract;
};

const contracts = ref<Contract[]>([]);
try {
	contracts.value = await contractService.getAll();
} catch (error) {
	console.error(error);
}
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include tableAndDetail;
</style>

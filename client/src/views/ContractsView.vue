<template>
	<div id="tableAndDetailWrapper">
		<article>
			<section class="controls">
				<Button icon="add" @click="createNewContract" />
			</section>
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
						<td><IdDisplayer :id="contract.id" name="contract" shorten /></td>
						<td>{{ contract.totalCost }}</td>
						<td>{{ new Date(contract.dateOfSigning).toLocaleDateString() }}</td>
					</tr>
				</tbody>
			</table>
		</article>
		<DetailContract
			v-if="selectedContract"
			:key="selectedContract.id"
			:contract="selectedContract"
			@update:contract="updatedContract"
			@delete:contract="deletedContract"
		/>
	</div>
</template>

<script setup lang="ts">
import DetailContract from "@/components/details/DetailContract.vue";
import router from "@/router";
import { contractService } from "@/services/contractService";
import type { Contract } from "@/types/Contract";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import IdDisplayer from "@/components/IdDisplayer.vue";
import Button from "@/components/Button.vue";

const selectedContract = ref<Contract | null>(null);
const selectContract = (contract: Contract) => {
	router.push({ query: { id: contract.id } });
};

const route = useRoute();
watch(
	() => route.query.id,
	(newId) => {
		if (newId && contracts.value) {
			selectedContract.value = contracts.value.find((c) => c.id === newId) || null;
		} else {
			selectedContract.value = null;
		}
	},
);

const updatedContract = (updatedContract: Contract) => {
	if (contracts.value) {
		const index = contracts.value.findIndex((c) => c.id === updatedContract.id);
		if (index !== -1) {
			contracts.value[index] = updatedContract;
		}
	}
	selectedContract.value = updatedContract;
};

const deletedContract = () => {
	router.push({ query: { id: undefined } });
	fetchContracts();
};

const contracts = ref<Contract[]>([]);
const fetchContracts = async () => {
	try {
		contracts.value = await contractService.getAll();
		if (route.query.id) {
			selectedContract.value =
				contracts.value.find((c) => c.id === route.query.id) || null;
		}
	} catch (error) {
		console.error(error);
	}
};

onMounted(async () => {
	await fetchContracts();
});

const createNewContract = () => {
	selectedContract.value = {
		id: "NEW",
		createdAt: new Date(Date.now()).toLocaleDateString(),
		totalCost: 0,
		dateOfSigning: new Date(Date.now()).toLocaleDateString(),
		locationId: "",
		note: null,
	};
};
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include tableAndDetail;
</style>

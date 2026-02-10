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
		<ContractDetail
			v-if="selectedContract"
			:key="selectedContract.id"
			:contract="selectedContract"
			@update:contract="updatedContract"
			@delete:contract="deletedContract"
		/>
		<ContractCreate v-if="creating" @create:contract="createdContract" />
	</div>
</template>

<script setup lang="ts">
import ContractDetail from "@/components/details/ContractDetail.vue";
import router from "@/router";
import { contractService } from "@/services/contractService";
import type { Contract } from "@/types/Contract";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, type LocationQueryValue } from "vue-router";
import IdDisplayer from "@/components/IdDisplayer.vue";
import Button from "@/components/Button.vue";
import ContractCreate from "@/components/creates/ContractCreate.vue";

const selectedContract = ref<Contract | null>(null);
const selectContract = (contract: Contract) => {
	router.push({ query: { id: contract.id } });
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

const createdContract = async () => {
	router.push({ query: {} });
	await fetchContracts();
};

const handleQueryId = (id: LocationQueryValue | LocationQueryValue[] | undefined) => {
	if (id === "NEW") {
		creating.value = true;
		selectedContract.value = null;
	} else if (id && contracts.value) {
		creating.value = false;
		selectedContract.value = contracts.value.find((c) => c.id === id) || null;
	} else {
		creating.value = false;
		selectedContract.value = null;
	}
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

const handleEscape = (event: KeyboardEvent) => {
	if (event.key === "Escape") {
		router.push({ query: { id: undefined } });
	}
};

onMounted(async () => {
	await fetchContracts();
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

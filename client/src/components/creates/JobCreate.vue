<template>
	<article>
		<h3>Tvorba práce</h3>
		<ul>
			<li>
				<p>Datum provedení:</p>
				<section class="dateInputs">
					<GenericInput
						type="number"
						icon="calendar_view_day"
						label="Den:"
						v-model="day"
						min="1"
						max="31"
					/>
					<GenericInput
						type="number"
						icon="calendar_view_month"
						label="Měsíc:"
						v-model="month"
						min="1"
						max="12"
					/>
					<GenericInput
						type="number"
						icon="calendar_month"
						label="Rok:"
						v-model="year"
					/>
				</section>
			</li>
			<li>
				<SelectInput
					label="Zakázka:"
					v-model="job.contractId"
					:options="optionsList"
				/>
			</li>
			<li>
				<TextArea label="Poznámky:" v-model="job.note" />
			</li>
		</ul>
		<section class="buttons">
			<Button label="Vytvořit práci" icon="save" @click="save" />
			<Button label="Zrušit tvorbu" icon="delete" color="danger" @click="cancel" />
		</section>
	</article>
</template>

<script setup lang="ts">
import type { JobCreate } from "@/types/Job";
import Button from "../Button.vue";
import GenericInput from "../GenericInput.vue";
import TextArea from "../TextArea.vue";
import { jobService } from "@/services/jobService";
import { computed, onMounted, ref } from "vue";
import SelectInput from "../SelectInput.vue";
import router from "@/router";
import { contractService } from "@/services/contractService";
import { type Option } from "../SelectInput.vue";
import type { Contract } from "@/types/Contract";

const emit = defineEmits<{
	"create:job": [];
}>();

const job = ref<JobCreate>({
	date: new Date(Date.now()),
	contractId: "",
	note: "",
});

const date = new Date(job.value.date);
const day = ref(date.getDate());
const month = ref(date.getMonth() + 1);
const year = ref(date.getFullYear());

const convertToDate = (day: number, month: number, year: number) => {
	const date = new Date(year, month - 1, day);
	return date;
};

const cancel = () => {
	router.push({ query: {} });
};

const save = async () => {
	try {
		job.value.date = convertToDate(day.value, month.value, year.value);
		await jobService.create(job.value);
		emit("create:job");
		alert("Vytvořeno");
	} catch (error) {
		console.error(error);
	}
};

const contracts = ref<Contract[]>([]);
const fetchContracts = async () => {
	try {
		contracts.value = await contractService.getAll();
	} catch (error) {
		console.error(error);
	}
};

const optionsList = computed(() => {
	const options: Option[] = [];
	for (const contract of contracts.value) {
		options.push({
			label: `${contract.id}`,
			value: contract.id,
		});
	}
	return options;
});

onMounted(async () => {
	await fetchContracts();
});
</script>

<style scoped lang="scss">
@use "../../assets/mixins" as *;
@include detailStyling;
</style>

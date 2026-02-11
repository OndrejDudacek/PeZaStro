<template>
	<article>
		<ul>
			<li>
				<p>Id: Nový popis práce</p>
			</li>
			<li>
				<GenericInput
					type="text"
					icon="assignment"
					label="Jméno:"
					placeholder="Sekání trávy"
					v-model="jobDesc.name"
				/>
			</li>
			<li>
				<GenericInput
					type="number"
					icon="payments"
					label="Cena:"
					placeholder="400"
					v-model="jobDesc.cost"
				/>
			</li>
			<li>
				<SelectInput
					name="frequency"
					label="Frekvence:"
					:options="[
						{ label: 'Měsíčně', value: Frequency.month },
						{ label: 'Ročně', value: Frequency.year },
					]"
					v-model="jobDesc.frequency"
				/>
			</li>
			<li>
				<GenericInput
					type="number"
					label="Perioda:"
					:model-value="jobDesc.period === null ? 0 : jobDesc.period"
					@update:model-value="jobDesc.period = Number($event)"
				/>
			</li>
		</ul>
		<section class="buttons">
			<Button label="Vytvořit popis práce" icon="save" @click="save" />
			<Button label="Zrušit tvorbu" icon="delete" color="danger" @click="cancel" />
		</section>
	</article>
</template>

<script setup lang="ts">
import { Frequency, type JobDescriptionCreate } from "@/types/JobDescription";
import { ref } from "vue";
import Button from "../Button.vue";
import GenericInput from "../GenericInput.vue";
import { jobDescriptionService } from "@/services/jobDescriptionService";
import SelectInput from "../SelectInput.vue";

const emit = defineEmits<{
	"create:jobDescription": [];
	"cancel:jobDescription": [];
}>();

const props = defineProps<{
	contractId: string;
}>();

const jobDesc = ref<JobDescriptionCreate>({
	name: "",
	contractId: props.contractId,
	cost: 0,
	frequency: undefined,
	period: undefined,
});

const cancel = () => {
	emit("cancel:jobDescription");
};

const save = async () => {
	try {
		await jobDescriptionService.create(jobDesc.value);
		emit("create:jobDescription");
		alert("Vytvořeno");
	} catch (error) {
		console.error(error);
	}
};
</script>

<style scoped lang="scss">
@use "../../assets/mixins" as *;
@include detailStyling;
</style>

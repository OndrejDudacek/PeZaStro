<template>
	<article>
		<h3>Detail práce</h3>
		<ul>
			<li>
				<p>Id: {{}}</p>
			</li>
			<li>
				<p>Datum vytvoření: {{}}</p>
			</li>
			<li>
				<p>Datum provedení:</p>
				<section class="dateInputs">
					<GenericInput type="number" label="Den:" />
					<GenericInput type="number" label="Měsíc:" />
					<GenericInput type="number" label="Rok:" />
				</section>
			</li>
			<li>
				<p>Id zakázky: {{}}</p>
			</li>
			<li>
				<TextArea label="Poznámky:" />
			</li>
		</ul>
		<Button label="Odeslat změny" icon="upload"></Button>
	</article>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import GenericInput from "./GenericInput.vue";
import TextArea from "./TextArea.vue";

const props = defineProps<{
	jobId: String;
}>();
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

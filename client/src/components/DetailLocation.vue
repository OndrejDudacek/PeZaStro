<template>
	<article>
		<h3>Detail lokace</h3>
		<ul>
			<li>
				<p>Id: {{}}</p>
			</li>
			<li>
				<p>Datum vytvoření: {{}}</p>
			</li>
			<li>
				<GenericInput type="text" label="Ulice:" placeholder="Rohová" />
			</li>
			<li>
				<GenericInput type="number" label="Číslo domu:" placeholder="559" />
			</li>
			<li>
				<GenericInput type="text" label="PSČ:" placeholder="151 00" />
			</li>
			<li>
				<GenericInput type="text" label="Město:" placeholder="Praha" />
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
	locationId: String;
}>();
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

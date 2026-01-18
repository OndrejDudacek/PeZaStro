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
				<TextInput label="Ulice:" placeholder="Rohová" />
			</li>
			<li>
				<NumberInput label="Číslo domu:" placeholder="559" />
			</li>
			<li>
				<TextInput label="PSČ:" placeholder="151 00" />
			</li>
			<li>
				<TextInput label="Město:" placeholder="Praha" />
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
import NumberInput from "./NumberInput.vue";
import TextInput from "./TextInput.vue";
import TextArea from "./TextArea.vue";

const props = defineProps<{
	locationId: String;
}>();
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

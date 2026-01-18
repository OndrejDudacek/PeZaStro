<template>
	<article>
		<h3>Detail zákazníka</h3>
		<ul>
			<li>
				<p>Id: {{}}</p>
			</li>
			<li>
				<p>Datum vytvoření: {{}}</p>
			</li>
			<li>
				<GenericInput type="text" label="Jméno:" placeholder="Jan Nezdar" />
			</li>
			<li>
				<TextArea label="Poznámky:" />
			</li>
		</ul>
		<h4>Kontakty:</h4>
		<ul>
			<!-- v-for="(customers, i) in customer" :key="i" -->
			<li>
				<ul>
					<li>
						<p>Id: {{}}</p>
					</li>
					<li>
						<p>Datum vytvoření: {{}}</p>
					</li>
					<li>
						<GenericInput
							type="text"
							label="Jméno:"
							placeholder="Josefína Nezdarová"
						/>
					</li>
					<li>
						<GenericInput type="number" label="Telefon:" placeholder="777666111" />
					</li>
					<li>
						<GenericInput
							type="text"
							label="Email:"
							placeholder="josefina.nezdarova@gmail.com"
						/>
					</li>
				</ul>
			</li>
		</ul>
		<Button label="Přidat kontakt" icon="add" />
		<Button label="Odeslat změny" icon="upload"></Button>
	</article>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import GenericInput from "./GenericInput.vue";
import TextArea from "./TextArea.vue";

const props = defineProps<{
	customerId: String;
}>();
</script>

<style scoped lang="scss">
@use "../assets/mixins" as *;
@include detailStyling;
</style>

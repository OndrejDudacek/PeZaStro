<template>
	<article>
		<h3>Detail zakázky</h3>
		<ul>
			<li>
				<p>Id: {{}}</p>
			</li>
			<li>
				<p>Datum vytvoření: {{}}</p>
			</li>
			<li>
				<p>Celková cena: {{}}</p>
			</li>
			<li>
				<p>Datum podepsání:</p>
				<div class="dateInputs">
					<NumberInput label="Den:" />
					<NumberInput label="Měsíc:" />
					<NumberInput label="Rok:" />
				</div>
			</li>
			<li>
				<TextArea label="Poznámky:" />
			</li>
		</ul>
		<h4>Popisy práce:</h4>
		<ul>
			<!-- v-for="(jobDesc, i) in jobDescs" :key="i" -->
			<li>
				<ul>
					<li>
						<p>Id: {{}}</p>
					</li>
					<li>
						<p>Datum vytvoření: {{}}</p>
					</li>
					<li>
						<TextInput label="Jméno:" placeholder="Sekání trávy" />
					</li>
					<li>
						<p>Cena: {{}}</p>
					</li>
					<li>
						<SelectInput
							name="frequency"
							label="Frekvence:"
							:options="[
								{ label: 'Měsíčně', value: 'month' },
								{ label: 'Ročně', value: 'year' },
							]"
						/>
					</li>
					<li>
						<NumberInput label="Perioda:" />
					</li>
				</ul>
			</li>
		</ul>
		<Button label="Přidat popis práce" icon="add" />
		<h4>Záznamy prací:</h4>
		<ul>
			<!-- v-for="(job, i) in jobs" :key="i" -->
			<li>
				<ul>
					<li><p>Id: {{}}</p></li>
					<li><p>Datum vytvoření: {{}}</p></li>
					<li>
						<p>Datum práce:</p>
						<div class="dateInputs">
							<NumberInput label="Den:" />
							<NumberInput label="Měsíc:" />
							<NumberInput label="Rok:" />
						</div>
					</li>
					<li>
						<TextArea label="Poznámky:" />
					</li>
				</ul>
			</li>
		</ul>
		<Button label="Přidat záznam práce" icon="add" />
		<Button label="Odeslat změny" icon="upload"></Button>
	</article>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import NumberInput from "./NumberInput.vue";
import TextInput from "./TextInput.vue";
import TextArea from "./TextArea.vue";
import SelectInput from "./SelectInput.vue";

const props = defineProps<{
	contractId: String;
}>();
</script>

<style scoped lang="scss">
article {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-l);
}

ul {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-m);
}

li {
	padding-left: var(--spacing-m);
}

div.dateInputs {
	display: flex;
	gap: var(--spacing-m);
}
</style>

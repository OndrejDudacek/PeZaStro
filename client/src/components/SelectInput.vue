<template>
	<section>
		<label :for="name">{{ label }}</label>
		<div @click="focusInput">
			<select
				ref="inputRef"
				:name="name"
				:value="modelValue"
				@change="
					$event.target &&
					$emit('update:modelValue', ($event.target as HTMLSelectElement).value)
				"
			>
				<option value="" disabled>
					{{ label || "Select" }}
				</option>
				<option v-for="option in options" :key="option.value" :value="option.value">
					{{ option.label }}
				</option>
			</select>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Option {
	label: string;
	value: string;
}

const props = defineProps<{
	name: string;
	label?: string;
	options: Option[];
	modelValue?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLSelectElement | null>(null);

const focusInput = () => {
	inputRef.value?.focus();
};
</script>

<style scoped lang="scss">
section {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-xs);

	label {
		cursor: pointer;
	}
}

div {
	display: flex;
	justify-content: left;
	align-items: center;
	gap: var(--spacing-xs);
	background-color: var(--color-background);
	cursor: pointer;
	padding: var(--spacing-s);
	outline: var(--border-width) solid var(--color-border);
	border-radius: var(--border-radius);

	select {
		font: inherit;
		background-color: inherit;
		outline: none;
		border: none;
		width: 100%;
		cursor: pointer;
	}
}

div:hover {
	outline: var(--border-width-hover) solid var(--color-border);
}

div:active,
div:has(select:focus) {
	outline: var(--border-width-active) solid var(--color-border);
}
</style>

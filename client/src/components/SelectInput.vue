<template>
	<section>
		<label :for="name">{{ label }}</label>
		<div @click="focusInput" :class="[`input-color-${color}`, `input-success-${success}`]">
			<select ref="inputRef" :name="name" :value="modelValue" @change="handleInput">
				<option value="">--{{ label || "Vyber" }}--</option>
				<option v-for="option in options" :key="option.value" :value="option.value">
					{{ option.label }}
				</option>
			</select>
		</div>
	</section>
</template>

<script setup lang="ts">
import { debounce } from "@/utils/debounce";
import { ref } from "vue";

export interface Option {
	label: string;
	value: string;
}

const props = defineProps<{
	name?: string;
	label?: string;
	options: Option[];
	modelValue?: string | null;
	color?: "danger";
	success?: boolean;
}>();

const emit = defineEmits<{
	"update:modelValue": [value: string | null];
	"debounced:modelValue": [value: string | null];
}>();

const debouncedEmit = debounce((value: string) => emit("debounced:modelValue", value));

const handleInput = (event: Event) => {
	const value = (event.target as HTMLSelectElement).value;
	const parsedValue = value === "" ? null : value;
	emit("update:modelValue", parsedValue);
	debouncedEmit(parsedValue);
};

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

	&:hover {
		outline: var(--border-width-hover) solid var(--color-border);
	}

	&:active,
	&:has(select:focus) {
		outline: var(--border-width-active) solid var(--color-border);
	}

	&.input-color-danger {
		color: var(--color-danger);
		outline: var(--border-width) solid var(--color-danger);
	}

	&.input-color-danger:hover {
		outline: var(--border-width-hover) solid var(--color-danger);
	}

	&.input-color-danger:active,
	&.input-color-danger:has(input:focus) {
		outline: var(--border-width-active) solid var(--color-danger);
	}

	&.input-success-true {
		color: var(--color-success);
		outline: var(--border-width) solid var(--color-success);
	}

	&.input-success-true:hover {
		outline: var(--border-width-hover) solid var(--color-success);
	}

	&.input-success-true:active,
	&.input-success-true:has(input:focus) {
		outline: var(--border-width-active) solid var(--color-success);
	}
}
</style>

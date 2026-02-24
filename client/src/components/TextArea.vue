<template>
	<section>
		<label v-if="label" :for="inputName ?? inputId" @click="focusInput">{{ label }}</label>
		<textarea
			:name="inputName"
			:placeholder="placeholder"
			:value="modelValue"
			@input="handleInput"
			:id="inputName ?? inputId"
			ref="inputRef"
			:class="[`textarea-success-${success}`]"
		></textarea>
	</section>
</template>

<script setup lang="ts">
import { debounce } from "@/utils/debounce";
import { ref, onMounted, watch } from "vue";

const inputId = String(Math.floor(Math.random() * 1000));

const props = withDefaults(
	defineProps<{
		inputName?: string;
		placeholder?: string;
		label?: string;
		minRows?: number;
		success?: boolean;
		emptyAsNull?: boolean;
	}>(),
	{
		minRows: 3,
	},
);

const emit = defineEmits<{
	"debounced:modelValue": [value: string | null];
}>();

const modelValue = defineModel<string | null>();

const inputRef = ref<HTMLTextAreaElement | null>(null);

const adjustHeight = () => {
	if (inputRef.value) {
		inputRef.value.style.height = "auto";
		inputRef.value.style.height = inputRef.value.scrollHeight + "px";
	}
};

const debouncedEmit = debounce((value: string) => emit("debounced:modelValue", value));

const handleInput = (event: Event) => {
	const value = (event.target as HTMLTextAreaElement).value;
	adjustHeight();
	let finalValue: string | null = value === "" && props.emptyAsNull ? null : value;
	debouncedEmit(finalValue);
};

const focusInput = () => {
	inputRef.value?.focus();
};

onMounted(() => {
	adjustHeight();
});

watch(
	() => modelValue.value,
	() => {
		adjustHeight();
	},
);
</script>

<style lang="scss" scoped>
section {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-s);

	label {
		cursor: text;
	}

	textarea {
		resize: vertical;
		outline: var(--border-width) solid var(--color-border);
		border-radius: var(--border-radius);
		font: inherit;
		background-color: var(--color-background);
		padding: var(--spacing-s);
		overflow: hidden;
		min-height: calc(1.5em * 3);

		&:hover {
			outline: var(--border-width-hover) solid var(--color-border);
		}

		&:focus {
			outline: var(--border-width-active) solid var(--color-border);
		}

		&.textarea-success-true {
			outline: var(--border-width) solid var(--color-success);
		}

		&.textarea-success-true:hover {
			outline: var(--border-width-hover) solid var(--color-success);
		}

		&.textarea-success-true:active,
		&.textarea-success-true:has(input:focus) {
			outline: var(--border-width-active) solid var(--color-success);
		}
	}
}
</style>

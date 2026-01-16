<template>
	<section>
		<label v-if="label" :for="inputName" @click="focusInput">{{ label }}</label>
		<textarea
			:name="inputName"
			:placeholder="placeholder"
			:value="modelValue"
			@input="handleInput"
			:id="inputName"
			ref="inputRef"
		></textarea>
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps({
	inputName: {
		type: String,
	},
	placeholder: {
		type: String,
	},
	modelValue: {
		type: String,
	},
	label: {
		type: String,
	},
	minRows: {
		type: Number,
		default: 3,
	},
});

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLTextAreaElement | null>(null);

const adjustHeight = () => {
	if (inputRef.value) {
		inputRef.value.style.height = "auto";
		inputRef.value.style.height = inputRef.value.scrollHeight + "px";
	}
};

const handleInput = (event: Event) => {
	emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
	adjustHeight();
};

const focusInput = () => {
	inputRef.value?.focus();
};

onMounted(() => {
	adjustHeight();
});

watch(
	() => props.modelValue,
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
		min-height: calc(1.5em * 3); /* 3 lines minimum */
	}

	textarea:hover {
		outline: var(--border-width-hover) solid var(--color-border);
	}

	textarea:focus {
		outline: var(--border-width-active) solid var(--color-border);
	}
}
</style>

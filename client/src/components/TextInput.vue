<template>
	<section @click="focusInput">
		<Icon :icon-name="iconName"></Icon>
		<input
			ref="inputRef"
			type="text"
			:name="inputName"
			:placeholder="placeholder"
			:value="modelValue"
			@input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
		/>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Icon from "./Icon.vue";

const props = defineProps({
	iconName: {
		type: String,
	},
	inputName: {
		type: String,
	},
	placeholder: {
		type: String,
	},
	modelValue: {
		type: String,
	},
});

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLInputElement | null>(null);

const focusInput = () => {
	inputRef.value?.focus();
};
</script>

<style scoped lang="scss">
section {
	display: flex;
	justify-content: left;
	align-items: center;
	gap: var(--spacing-xs);
	background-color: var(--color-background);
	cursor: pointer;
	padding: var(--spacing-s);
	outline: var(--border-width) solid var(--color-border);
	border-radius: var(--border-radius);

	input {
		font: inherit;
		background-color: inherit;
		outline: none;
		border: none;
		width: 100%;
	}
}

section:hover {
	outline: var(--border-width-hover) solid var(--color-border);
}

section:active,
section:has(input:focus) {
	outline: var(--border-width-active) solid var(--color-border);
}
</style>

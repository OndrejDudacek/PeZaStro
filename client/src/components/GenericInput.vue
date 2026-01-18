<template>
	<section>
		<label v-if="label" :for="inputName" @click="focusInput">{{ label }}</label>
		<div @click="focusInput">
			<Icon v-if="iconName" :icon-name="iconName"></Icon>
			<input
				ref="inputRef"
				:type="type || 'text'"
				:name="inputName"
				:placeholder="placeholder"
				:value="modelValue"
				@input="handleInput"
				:id="inputName"
				v-bind="attrs"
			/>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, useAttrs } from "vue";
import Icon from "./Icon.vue";

const props = defineProps<{
	iconName?: string;
	inputName?: string;
	placeholder?: string;
	modelValue?: string | number;
	label?: string;
	type?: "text" | "number" | "email" | "password" | "tel" | "url";
}>();

const attrs = useAttrs();

const emit = defineEmits<{
	"update:modelValue": [value: string | number];
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const focusInput = () => {
	inputRef.value?.focus();
};

const handleInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	const value = props.type === "number" ? Number(target.value) : target.value;
	emit("update:modelValue", value);
};
</script>

<style scoped lang="scss">
section {
	display: flex;
	flex-direction: column;
	gap: var(--spacing-xs);

	label {
		cursor: text;
	}
}

div {
	display: flex;
	justify-content: left;
	align-items: center;
	gap: var(--spacing-xs);
	background-color: var(--color-background);
	cursor: text;
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

div:hover {
	outline: var(--border-width-hover) solid var(--color-border);
}

div:active,
div:has(input:focus) {
	outline: var(--border-width-active) solid var(--color-border);
}
</style>

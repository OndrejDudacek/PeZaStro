<template>
	<section>
		<label v-if="label" :for="inputName" @click="focusInput">{{ label }}</label>
		<div @click="focusInput" :class="[`input-color-${color}`, `input-success-${success}`]">
			<Icon v-if="icon" :icon-name="iconName"></Icon>
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
import { computed, ref, useAttrs } from "vue";
import Icon from "./Icon.vue";

const props = defineProps<{
	icon?: string;
	inputName?: string;
	placeholder?: string;
	modelValue?: string | number;
	label?: string;
	type?: "text" | "number" | "email" | "password" | "tel" | "url";
	color?: "danger";
	success?: boolean;
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

const iconName = computed(() => {
	return props.icon ? (props.success ? "check" : props.icon) : "";
});
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

	&:hover {
		outline: var(--border-width-hover) solid var(--color-border);
	}

	&:active,
	&:has(input:focus) {
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

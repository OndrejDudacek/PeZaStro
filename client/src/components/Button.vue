<template>
	<button :class="[`button-color-${color}`, `button-success-${success}`]">
		<Icon v-if="icon" :icon-name="iconName" />
		<p>{{ props.label }}</p>
	</button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Icon from "./Icon.vue";

const props = defineProps<{
	label?: string;
	icon?: string;
	color?: "default" | "danger";
	success?: boolean;
}>();

const iconName = computed(() => {
	return props.icon ? (props.success ? "check" : props.icon) : "";
});
</script>

<style scoped lang="scss">
button {
	display: flex;
	justify-content: left;
	align-items: center;
	gap: var(--spacing-xs);
	background-color: var(--color-background);
	cursor: pointer;
	padding: var(--spacing-s);
	outline: var(--border-width) solid var(--color-border);
	border-radius: var(--border-radius);
	transition: scale var(--transition-time);

	&.button-color-danger {
		outline: var(--border-width) solid var(--color-danger);
		color: var(--color-danger);

		p {
			color: var(--color-danger);
		}
	}

	&.button-color-danger:hover {
		outline: var(--border-width-hover) solid var(--color-danger);
	}

	&.button-color-danger:active {
		outline: var(--border-width-active) solid var(--color-danger);
	}

	&.button-success-true {
		outline: var(--border-width) solid var(--color-success);
		color: var(--color-success);

		p {
			color: var(--color-success);
		}
	}

	&.button-success-true:hover {
		outline: var(--border-width-hover) solid var(--color-success);
	}

	&.button-success-true:active {
		outline: var(--border-width-active) solid var(--color-success);
	}
}

button:hover {
	outline: var(--border-width-hover) solid var(--color-border);
}

button:active {
	outline: var(--border-width-active) solid var(--color-border);
}
</style>

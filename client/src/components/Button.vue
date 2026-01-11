<template>
	<button>
		<Icon v-if="icon" :icon-name="icon" />
		<p>{{ props.label }}</p>
	</button>
</template>

<script setup lang="ts">
import Icon from "./Icon.vue";

const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	icon: {
		type: String,
	},
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
	border: var(--border-width) solid var(--color-border);
	border-radius: var(--border-radius);
	transition: scale var(--transition-time);
}

button:hover {
	scale: 1.05;
}

button:active {
	scale: 0.98;
}
</style>

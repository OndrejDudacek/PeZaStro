<template>
	<span class="material-symbols-outlined">{{ props.iconName }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
	iconName: {
		type: String,
		default: "hide_source",
	},
});
</script>

<style scoped lang="scss">
span {
	font-size: inherit;
	text-align: center;
}
</style>

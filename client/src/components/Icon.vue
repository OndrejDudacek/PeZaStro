<template>
	<span class="material-symbols-outlined">{{ props.iconName }}</span>
</template>

<script setup lang="ts">
const props = defineProps({
	iconName: {
		type: String,
	},
});
</script>

<style scoped lang="scss">
span {
	font-size: inherit;
	text-align: center;
	color: inherit;
}
</style>

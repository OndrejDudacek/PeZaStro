<template>
	<RouterLink v-if="link" :to="{ name, query: { id } }" :title="id">
		<Icon icon-name="link_2" /> {{ idToDisplay }}
	</RouterLink>
	<span v-else :title="id" @click="copyToClipboard" :class="{ copiable: copy }"
		><Icon icon-name="content_copy" v-if="copy" /> {{ idToDisplay }}</span
	>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Icon from "./Icon.vue";

const props = defineProps<{
	id: string;
	name?: "customer" | "contract" | "job" | "location";
	shorten?: boolean;
	copy?: boolean;
	link?: boolean;
}>();

const idToDisplay = computed(() => {
	const shortId = `${props.id.substring(0, 4)}...${props.id.substring(props.id.length - 4, props.id.length)}`;
	return props.shorten ? shortId : props.id;
});

const copyToClipboard = async () => {
	if (props.copy) {
		try {
			await navigator.clipboard.writeText(props.id);
			alert("Copied to clipboard!");
		} catch (error) {
			console.error(error);
		}
	}
};
</script>

<style scoped lang="scss">
span.copiable {
	cursor: pointer;
}
</style>

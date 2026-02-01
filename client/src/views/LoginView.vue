<template>
	<div>
		<h1>Pezastro přihlášení</h1>
		<form @submit.prevent="login">
			<GenericInput
				type="text"
				icon-name="person"
				label="Uživatelské jméno"
				v-model="username"
				:required="true"
			/>
			<GenericInput
				type="password"
				icon-name="key"
				label="Heslo"
				v-model="password"
				:required="true"
			/>
			<Button type="submit" label="Přihlásit se" />
		</form>
	</div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import GenericInput from "@/components/GenericInput.vue";
import { ref } from "vue";
import { userService } from "@/services/userService";
import { useRouter } from "vue-router";

const username = ref<string>("");
const password = ref<string>("");

const router = useRouter();

const login = async () => {
	const succes = await userService.login({
		username: username.value,
		password: password.value,
	});

	if (succes) {
		router.push({ name: "dashboard" });
	}
};
</script>

<style scoped lang="scss">
div {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: var(--spacing-s);

	h1 {
		width: 80%;
		max-width: 30rem;
		text-align: left;
	}

	form {
		padding: var(--spacing-xl);
		width: 80%;
		max-width: 30rem;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		gap: var(--spacing-m);
		border: var(--border-width) var(--color-border) solid;
		border-radius: var(--border-radius);
	}
}
</style>

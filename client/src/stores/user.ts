import { ref } from "vue";
import { defineStore } from "pinia";
import type { UserLoginResponse } from "@/types/User";

export const useUserStore = defineStore(
	"user",
	() => {
		const id = ref<string | null>(null);
		const username = ref<string | null>(null);
		const token = ref<string | null>(null);

		id.value = localStorage.getItem("userId") || null;
		username.value = localStorage.getItem("username") || null;
		token.value = localStorage.getItem("token") || null;

		const onLogin = (data: UserLoginResponse) => {
			id.value = data.userId;
			username.value = data.username;
			token.value = data.token;
		};

		const onLogout = () => {
			id.value = null;
			username.value = null;
			token.value = null;
		};

		return { id, username, token, onLogin, onLogout };
	},
	{
		persist: true,
	},
);

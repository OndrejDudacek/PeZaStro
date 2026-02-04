import { ref } from "vue";
import { defineStore } from "pinia";
import type { UserLoginResponse } from "@/types/User";

export const useUserStore = defineStore("user", () => {
	const userId = ref<string | null>(null);
	const username = ref<string | null>(null);
	const userToken = ref<string | null>(null);

	const onLogin = (data: UserLoginResponse) => {
		userId.value = data.userId;
		username.value = data.username;
		userToken.value = data.token;
	};

	const onLogout = () => {
		userId.value = null;
		username.value = null;
		userToken.value = null;
	};

	return { userId, username, userToken, onLogin, onLogout };
});

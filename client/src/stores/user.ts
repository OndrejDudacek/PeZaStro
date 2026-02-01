import { ref } from "vue";
import { defineStore } from "pinia";
import type { UserLoginResponse } from "@/types/User";
import { loadRouteLocation } from "vue-router";

export const useUserStore = defineStore("user", () => {
	const userId = ref<string | null>(null);
	const username = ref<string | null>(null);
	const userToken = ref<string | null>(null);

	const retrivieUser = () => {
		const retriviedId = localStorage.getItem("id");
		const retriviedUsername = localStorage.getItem("username");
		const retriviedToken = localStorage.getItem("token");

		if (retriviedId && retriviedUsername && retriviedToken) {
			userId.value = retriviedId;
			username.value = retriviedUsername;
			userToken.value = retriviedToken;
		}
	};

	const onLogin = (data: UserLoginResponse) => {
		userId.value = data.id;
		username.value = data.username;
		userToken.value = data.token;
		localStorage.setItem("id", data.id);
		localStorage.setItem("username", data.username);
		localStorage.setItem("token", data.token);
	};

	const onLogout = () => {
		userId.value = null;
		username.value = null;
		userToken.value = null;
		localStorage.removeItem("id");
		localStorage.removeItem("username");
		localStorage.removeItem("token");
	};

	const checkLogin = () => {
		if (userId.value !== null && username.value !== null && userToken.value !== null) {
			return true;
		} else {
			return false;
		}
	};

	return { userId, username, userToken, onLogin, onLogout, retrivieUser, checkLogin };
});

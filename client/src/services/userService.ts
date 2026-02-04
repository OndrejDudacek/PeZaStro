import { useUserStore } from "@/stores/user";
import { apiClient } from "./apiClient";
import type { UserLogin, UserLoginResponse } from "@/types/User";

const source = "/user";

export const userService = {
	async login(data: UserLogin) {
		try {
			const { username, token, id } = await apiClient.post<UserLoginResponse>(
				`${source}/login`,
				{
					username: data.username,
					password: data.password,
				},
			);

			const userStore = useUserStore();
			userStore.onLogin({ token, id, username });

			localStorage.setItem("id", id);
			localStorage.setItem("username", username);
			localStorage.setItem("token", token);
			localStorage.setItem("lastLogin", String(Date.now()));

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	},

	logout() {
		try {
			const userStore = useUserStore();
			userStore.onLogout();

			localStorage.removeItem("id");
			localStorage.removeItem("username");
			localStorage.removeItem("token");
			localStorage.removeItem("lastLogin");

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	},

	retrieveUser() {
		try {
			const lastLogin = localStorage.getItem("lastLogin");
			if (!lastLogin) {
				return false;
			}

			const lastLoginDifference = Date.now() - Number(lastLogin);
			if (lastLoginDifference >= 1 * 24 * 60 * 60 * 1000) {
				localStorage.removeItem("id");
				localStorage.removeItem("username");
				localStorage.removeItem("token");
				localStorage.removeItem("lastLogin");
				return false;
			}

			const retriviedId = localStorage.getItem("id");
			const retriviedUsername = localStorage.getItem("username");
			const retriviedToken = localStorage.getItem("token");

			if (!retriviedId || !retriviedUsername || !retriviedToken) {
				return false;
			}

			const userStore = useUserStore();
			userStore.onLogin({
				token: retriviedToken,
				id: retriviedId,
				username: retriviedUsername,
			});

			localStorage.setItem("id", retriviedUsername);
			localStorage.setItem("username", retriviedUsername);
			localStorage.setItem("token", retriviedUsername);
			localStorage.setItem("lastLogin", String(Date.now()));

			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	},
};

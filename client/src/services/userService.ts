import { useUserStore } from "@/stores/user";
import { apiClient } from "./apiClient";
import type { UserLogin, UserLoginResponse } from "@/types/User";

const source = "/user";

export const userService = {
	async login(data: UserLogin) {
		try {
			const { token, userId, username } = await apiClient.post<UserLoginResponse>(
				`${source}/login`,
				{
					username: data.username,
					password: data.password,
				},
			);

			const userStore = useUserStore();
			userStore.onLogin({ token, userId, username });

			localStorage.setItem("userId", userId);
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

			localStorage.removeItem("userId");
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
				localStorage.removeItem("userId");
				localStorage.removeItem("username");
				localStorage.removeItem("token");
				localStorage.removeItem("lastLogin");
				return false;
			}

			const retriviedId = localStorage.getItem("userId");
			const retriviedUsername = localStorage.getItem("username");
			const retriviedToken = localStorage.getItem("token");

			if (!retriviedId || !retriviedUsername || !retriviedToken) {
				return false;
			}

			const userStore = useUserStore();
			userStore.onLogin({
				token: retriviedToken,
				userId: retriviedId,
				username: retriviedUsername,
			});

			localStorage.setItem("userId", retriviedUsername);
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

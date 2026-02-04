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
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	},

	isAuthenticated() {
		const userStore = useUserStore();
		return !!userStore.token;
	},
};

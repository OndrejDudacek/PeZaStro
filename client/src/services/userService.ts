import { useUserStore } from "@/stores/user";
import { apiClient } from "./apiClient";
import type { UserLogin, UserLoginResponse } from "@/types/User";

const source = "/user";

export const userService = {
	async login(data: UserLogin) {
		const userStore = useUserStore();
		try {
			const { username, token, id } = await apiClient.post<UserLoginResponse>(
				`${source}/login`,
				{
					username: data.username,
					password: data.password,
				},
			);

			userStore.onLogin({ token, id, username });
			return true;
		} catch (error) {
			return false;
		}
	},
	logout() {
		try {
			const userStore = useUserStore();
			userStore.onLogout();
			return true;
		} catch (error) {
			return false;
		}
	},
};

import { useUserStore } from "@/stores/user";
import { userService } from "./userService";
import router from "@/router";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4321/api/v1";

interface RequestOptions extends RequestInit {
	headers?: Record<string, string>;
}

export const request = async <T>(
	endpoint: string,
	options: RequestOptions = {},
): Promise<T> => {
	const url = `${apiUrl}${endpoint}`;
	const userStore = useUserStore();
	const token = userStore.token;

	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		...options.headers,
	};

	if (token) {
		headers["Authorization"] = `bearer ${token}`;
	}

	const response = await fetch(url, { ...options, headers });

	if (!response.ok) {
		let errorMessage = `Chyba ${response.status}: ${response.statusText}`;

		try {
			const errorData = await response.json();
			if (errorData.message) errorMessage = errorData.message;
		} catch {}

		if (response.status === 401) {
			userService.logout();
			router.push({ name: "login" });
		}

		alert(errorMessage);
		throw new Error(errorMessage);
	}

	if (response.status === 204) {
		return null as T;
	}

	return response.json();
};

export const apiClient = {
	get: <T>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
	post: <T>(endpoint: string, body: unknown) =>
		request<T>(endpoint, { method: "POST", body: JSON.stringify(body) }),
	patch: <T>(endpoint: string, body: unknown) =>
		request<T>(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
	delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};

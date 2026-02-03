import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

export const initialAuthCheck = () => {
	onMounted(() => {
		const userStore = useUserStore();
		const router = useRouter();
		if (!userStore.checkLogin) {
			userStore.onLogout();
			router.push({ name: "login" });
		} else {
			router.push({ name: "dashboard" });
		}
	});
};

export const loadSavedUser = () => {
	onMounted(() => {
		const userStore = useUserStore();
		userStore.retrivieUser();
	});
};

import { createRouter, createWebHistory } from "vue-router";
import ContractsView from "@/views/ContractsView.vue";
import CustomersView from "@/views/CustomersView.vue";
import DashboardView from "@/views/DashboardView.vue";
import LocationView from "@/views/LocationView.vue";
import LoginView from "@/views/LoginView.vue";
import JobView from "@/views/JobView.vue";
import { userService } from "@/services/userService";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "dashboard",
			path: "/",
			component: DashboardView,
			meta: { requiresAuth: true },
		},
		{
			name: "contract",
			path: "/contract",
			component: ContractsView,
			meta: { requiresAuth: true },
		},
		{
			name: "customer",
			path: "/customer",
			component: CustomersView,
			meta: { requiresAuth: true },
		},
		{
			name: "location",
			path: "/location",
			component: LocationView,
			meta: { requiresAuth: true },
		},
		{ name: "job", path: "/job", component: JobView, meta: { requiresAuth: true } },
		{
			name: "login",
			path: "/login",
			component: LoginView,
			meta: { layout: "blank", requiresAuth: false },
		},
	],
});

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth && !userService.isAuthenticated()) {
		userService.logout();
		router.push({ name: "login" });
	} else {
		next();
	}
});

export default router;

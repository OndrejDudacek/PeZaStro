import { createRouter, createWebHistory } from "vue-router";
import ContractsView from "@/views/ContractsView.vue";
import CustomersView from "@/views/CustomersView.vue";
import DashboardView from "@/views/DashboardView.vue";
import LocationView from "@/views/LocationView.vue";
import LoginView from "@/views/LoginView.vue";
import JobView from "@/views/JobView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ name: "dashboard", path: "/", component: DashboardView },
		{ name: "contract", path: "/contract", component: ContractsView },
		{ name: "customer", path: "/customer", component: CustomersView },
		{ name: "location", path: "/location", component: LocationView },
		{ name: "job", path: "/job", component: JobView },
		{ name: "login", path: "/login", component: LoginView, meta: { layout: "blank" } },
	],
});

export default router;

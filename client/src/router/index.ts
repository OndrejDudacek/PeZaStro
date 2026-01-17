import { createRouter, createWebHistory } from "vue-router";
import ContractsView from "@/views/ContractsView.vue";
import CustomersView from "@/views/CustomersView.vue";
import DashboardView from "@/views/DashboardView.vue";
import LocationView from "@/views/LocationView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/", component: DashboardView },
		{ path: "/contract", component: ContractsView },
		{ path: "/customer", component: CustomersView },
		{ path: "/location", component: LocationView },
	],
});

export default router;

import { apiClient } from "./apiClient";
import type { Customer, CustomerCreate, CustomerUpdate } from "@/types/Customer";

const source = "/customer";

export const customerService = {
	getAll() {
		return apiClient.get<Customer[]>(source);
	},
	getById(id: string) {
		return apiClient.get<Customer>(`${source}/${id}`);
	},
	create(data: CustomerCreate) {
		return apiClient.post<Customer>(source, data);
	},
	update(id: string, data: CustomerUpdate) {
		return apiClient.patch<Customer>(`${source}/${id}`, data);
	},
	delete(id: string) {
		return apiClient.delete<{ message: string }>(`${source}/${id}`);
	},
};

import { apiClient } from "./apiClient";
import type { Contract, ContractCreate, ContractUpdate } from "@/types/Contract";

const source = "/contract";

export const contractService = {
	getAll() {
		return apiClient.get<Contract[]>(source);
	},
	getById(id: string) {
		return apiClient.get<Contract>(`${source}/${id}`);
	},
	create(data: ContractCreate) {
		return apiClient.post<Contract>(source, data);
	},
	update(id: string, data: ContractUpdate) {
		return apiClient.patch<Contract>(`${source}/${id}`, data);
	},
	delete(id: string) {
		return apiClient.delete<{ message: string }>(`${source}/${id}`);
	},
};

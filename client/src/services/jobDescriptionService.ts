import { apiClient } from "./apiClient";
import type {
	JobDescription,
	JobDescriptionCreate,
	JobDescriptionUpdate,
} from "@/types/JobDescription";

const source = "/jobDescription";

export const jobDescriptionService = {
	getAll(contractId?: string) {
		const url = contractId ? `${source}/?contractId=${contractId}` : source;
		return apiClient.get<JobDescription[]>(url);
	},
	getById(id: string) {
		return apiClient.get<JobDescription>(`${source}/${id}`);
	},
	create(data: JobDescriptionCreate) {
		return apiClient.post<JobDescription>(source, data);
	},
	update(id: string, data: JobDescriptionUpdate) {
		return apiClient.patch<JobDescription>(`${source}/${id}`, data);
	},
	delete(id: string) {
		return apiClient.delete<{ message: string }>(`${source}/${id}`);
	},
};

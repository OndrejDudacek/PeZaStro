import { apiClient } from "./apiClient";
import type {
	JobDescription,
	JobDescriptionCreate,
	JobDescriptionUpdate,
} from "@/types/JobDescription";

const source = "/jobDescription";

export const contactService = {
	getAll() {
		return apiClient.get<JobDescription[]>(source);
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

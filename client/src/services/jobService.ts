import { apiClient } from "./apiClient";
import type { Job, JobCreate, JobUpdate } from "@/types/Job";

const source = "/job";

export const jobService = {
	getAll() {
		return apiClient.get<Job[]>(source);
	},
	getById(id: string) {
		return apiClient.get<Job>(`${source}/${id}`);
	},
	create(data: JobCreate) {
		return apiClient.post<Job>(source, data);
	},
	update(id: string, data: JobUpdate) {
		return apiClient.patch<Job>(`${source}/${id}`, data);
	},
	delete(id: string) {
		return apiClient.delete<{ message: string }>(`${source}/${id}`);
	},
};

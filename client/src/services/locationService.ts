import { apiClient } from "./apiClient";
import type { Location, LocationCreate, LocationUpdate } from "@/types/Location";

const source = "/location";

export const locationService = {
	getAll() {
		return apiClient.get<Location[]>(source);
	},
	getById(id: string) {
		return apiClient.get<Location>(`${source}/${id}`);
	},
	create(data: LocationCreate) {
		return apiClient.post<Location>(source, data);
	},
	update(id: string, data: LocationUpdate) {
		return apiClient.patch<Location>(`${source}/${id}`, data);
	},
	delete(id: string) {
		return apiClient.delete<{ message: string }>(`${source}/${id}`);
	},
};

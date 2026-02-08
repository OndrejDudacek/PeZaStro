import { apiClient } from "./apiClient";
import type { Contact, ContactCreate, ContactUpdate } from "@/types/Contact";

const source = "/contact";

export const contactService = {
	getAll(customerId?: string) {
		const url = customerId ? `${source}/?customerId=${customerId}` : source;
		return apiClient.get<Contact[]>(url);
	},
	getById(id: string) {
		return apiClient.get<Contact>(`${source}/${id}`);
	},
	create(data: ContactCreate) {
		return apiClient.post<Contact>(source, data);
	},
	update(id: string, data: ContactUpdate) {
		return apiClient.patch<Contact>(`${source}/${id}`, data);
	},
	delete(id: string) {
		return apiClient.delete<{ message: string }>(`${source}/${id}`);
	},
};

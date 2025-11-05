import { IContactRepository } from "./contactRepository";
import { Contact } from "./contactEntity";
import { error } from "console";

export class ContactService {
	constructor(private repo: IContactRepository) {}

	async getAll() {
		const all = await this.repo.findAll();
		return all;
	}

	async getById(id: string) {
		const contact = await this.repo.findById(id);
		return contact;
	}

	async create(data: Omit<Contact, "id" | "createdAt">) {
		const created = await this.repo.create(data);
		return created;
	}

	async update(id: string, data: Partial<Contact>) {
		const updated = await this.repo.update(id, data);
		return updated;
	}

	async delete(id: string) {
		const ok = await this.repo.delete(id);
		return ok;
	}
}

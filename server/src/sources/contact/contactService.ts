import { IContactRepository, ContactData } from "./contactRepository";
import { Contact } from "./contactEntity";

export class ContactService {
	constructor(private repo: IContactRepository) {}

	async getAll(customerId?: string) {
		const all = await this.repo.findAll(customerId);
		return all;
	}

	async getById(id: string) {
		const contact = await this.repo.findById(id);
		return contact;
	}

	async create(data: ContactData) {
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

import { IContactRepository } from "./contactRepository";
import { Contact } from "./contactEntity";
import { contacts } from "../../db/inMemoryDB";

export class InMemoryContactRepository implements IContactRepository {
	async findAll(): Promise<Contact[]> {
		return [...contacts];
	}

	async findById(id: string): Promise<Contact | null> {
		return contacts.find((c) => c.id === id) ?? null;
	}

	async create(data: Omit<Contact, "id" | "createdAt">): Promise<Contact> {
		const contact = Contact.create(data.name, data.customerId, data.phone, data.email);
		contacts.push(contact);
		return contact;
	}

	async update(id: string, data: Partial<Contact>): Promise<Contact | null> {
		const contact = contacts.find((c) => c.id === id) ?? null;
		if (!contact) return null;
		Object.assign(contact, data);
		return contact;
	}

	async delete(id: string): Promise<boolean> {
		const index = contacts.findIndex((c) => c.id === id);
		if (index === -1) return false;
		contacts.splice(index, 1);
		return true;
	}
}

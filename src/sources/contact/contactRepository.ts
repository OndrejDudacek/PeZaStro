import { Contact } from "./contactEntity";

export interface IContactRepository {
	findAll(): Promise<Contact[]>;
	findById(id: string): Promise<Contact>;
	create(contact: Contact): Promise<Contact>;
	update(id: string, data: Partial<Contact>): Promise<Contact | null>;
	delete(id: string): Partial<boolean>;
}

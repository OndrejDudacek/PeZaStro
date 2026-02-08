import { Contact } from "./contactEntity";

export type ContactData = Omit<Contact, "id" | "createdAt">;

export interface IContactRepository {
	findAll(customerId?: string): Promise<Contact[]>;
	findById(id: string): Promise<Contact | null>;
	create(data: ContactData): Promise<Contact>;
	update(id: string, data: Partial<ContactData>): Promise<Contact | null>;
	delete(id: string): Promise<boolean>;
}

import { Contact } from "./contactEntity";

export type ContactData = Omit<Contact, "id" | "createdAt">;

export interface IContactRepository {
	findAll(): Promise<Contact[]>;
	findById(id: string): Promise<Contact | null>;
	create(data: Omit<Contact, "id" | "createdAt">): Promise<Contact>;
	update(id: string, data: Partial<Contact>): Promise<Contact | null>;
	delete(id: string): Promise<boolean>;
}

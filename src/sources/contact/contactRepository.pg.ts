import { Repository } from "typeorm";
import { Contact } from "./contactEntity";
import { ContactData, IContactRepository } from "./contactRepository";

export class PgContactRepository implements IContactRepository {
	constructor(private repo: Repository<Contact>) {}

	async findAll(): Promise<Contact[]> {
		const rows = await this.repo.find();
		return rows.map(
			(r) => new Contact(r.id, r.createdAt, r.name, r.customerId, r.phone, r.email),
		);
	}

	async findById(id: string): Promise<Contact | null> {
		const row = await this.repo.findOneBy({ id });
		return row
			? new Contact(
					row.id,
					row.createdAt,
					row.name,
					row.customerId,
					row.phone,
					row.email,
				)
			: null;
	}

	async create(data: ContactData): Promise<Contact> {
		const entity = this.repo.create(data);
		await this.repo.save(entity);
		return entity;
	}

	async update(id: string, data: Partial<Contact>): Promise<Contact | null> {
		const existing = await this.repo.findOneBy({ id });
		if (!existing) return null;
		Object.assign(existing, data);
		await this.repo.save(existing);
		return new Contact(
			existing.id,
			existing.createdAt,
			existing.name,
			existing.customerId,
			existing.phone,
			existing.email,
		);
	}

	async delete(id: string): Promise<boolean> {
		const res = await this.repo.delete(id);
		return res.affected ? res.affected > 0 : false;
	}
}

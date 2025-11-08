import { Repository } from "typeorm";
import { Customer } from "./customerEntity";
import { CustomerData, ICustomerRepository } from "./customerRepository";

export class PgCustomerRepository implements ICustomerRepository {
	constructor(private repo: Repository<Customer>) {}

	async findAll(): Promise<Customer[]> {
		const rows = await this.repo.find();
		return rows.map((r) => new Customer(r.id, r.createdAt, r.name, r.note));
	}

	async findById(id: string): Promise<Customer | null> {
		const row = await this.repo.findOneBy({ id });
		return row ? new Customer(row.id, row.createdAt, row.name, row.note) : null;
	}

	async create(data: CustomerData): Promise<Customer> {
		const entity = this.repo.create(data);
		await this.repo.save(entity);
		return entity;
	}

	async update(id: string, data: Partial<Customer>): Promise<Customer | null> {
		const existing = await this.repo.findOneBy({ id });
		if (!existing) return null;
		Object.assign(existing, data);
		await this.repo.save(existing);
		return new Customer(existing.id, existing.createdAt, existing.name, existing.note);
	}

	async delete(id: string): Promise<boolean> {
		const res = await this.repo.delete(id);
		return res.affected ? res.affected > 0 : false;
	}
}

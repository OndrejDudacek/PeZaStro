import { ICustomerRepository, CustomerData } from "./customerRepository";
import { Customer } from "./customerEntity";

export class CustomerService {
	constructor(private repo: ICustomerRepository) {}

	async getAll() {
		const all = await this.repo.findAll();
		return all;
	}

	async getById(id: string) {
		const customer = await this.repo.findById(id);
		return customer;
	}

	async create(data: CustomerData) {
		const created = await this.repo.create(data);
		return created;
	}

	async update(id: string, data: Partial<Customer>) {
		const updated = await this.repo.update(id, data);
		return updated;
	}

	async delete(id: string) {
		const ok = await this.repo.delete(id);
		return ok;
	}
}

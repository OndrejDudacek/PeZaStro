import { ICustomerRepository, CustomerData } from "./customerRepository";
import { Customer } from "./customerEntity";
import { customers } from "../../db/inMemoryDB";

export class InMemoryCustomerRepository implements ICustomerRepository {
	async findAll(): Promise<Customer[]> {
		return [...customers];
	}

	async findById(id: string): Promise<Customer | null> {
		return customers.find((c) => c.id === id) ?? null;
	}

	async create(data: CustomerData): Promise<Customer> {
		const customer = Customer.create(data.name, data.note);
		customers.push(customer);
		return customer;
	}

	async update(id: string, data: Partial<Customer>): Promise<Customer | null> {
		const customer = customers.find((c) => c.id === id) ?? null;
		if (!customer) return null;
		Object.assign(customer, data);
		return customer;
	}

	async delete(id: string): Promise<boolean> {
		const index = customers.findIndex((c) => c.id === id);
		if (index === -1) return false;
		customers.splice(index, 1);
		return true;
	}
}

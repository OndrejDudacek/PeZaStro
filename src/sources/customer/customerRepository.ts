import { Customer } from "./customerEntity";

export type CustomerData = Omit<Customer, "id" | "createdAt">;

export interface ICustomerRepository {
	findAll(): Promise<Customer[]>;
	findById(id: string): Promise<Customer | null>;
	create(data: CustomerData): Promise<Customer>;
	update(id: string, data: Partial<CustomerData>): Promise<Customer | null>;
	delete(id: string): Promise<boolean>;
}

import { Contract } from "./contractEntity";

export type ContractData = Omit<Contract, "id" | "createdAt">;

export interface IConstractRepository {
	findAll(): Promise<Contract[]>;
	findById(id: string): Promise<Contract>;
	create(data: ContractData): Promise<Contract>;
	update(id: string, data: Partial<ContractData>): Promise<Contract>;
	delete(id: string): Promise<boolean>;
}

import { Contract } from "./contractEntity";

export type ContractData = Omit<Contract, "id" | "createdAt">;

export interface IContractRepository {
	findAll(): Promise<Contract[]>;
	findById(id: string): Promise<Contract | null>;
	create(data: ContractData): Promise<Contract>;
	update(id: string, data: Partial<ContractData>): Promise<Contract | null>;
	delete(id: string): Promise<boolean>;
}

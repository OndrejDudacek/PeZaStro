import { IContractRepository } from "./contractRepository";
import { Contract } from "./contractEntity";
import { contracts } from "../../db/inMemoryDB";

export class InMemoryContractRepository implements IContractRepository {
	async findAll(): Promise<Contract[]> {
		return [...contracts];
	}

	async findById(id: string): Promise<Contract | null> {
		return contracts.find((c) => c.id === id) ?? null;
	}

	async create(data: Omit<Contract, "id" | "createdAt">): Promise<Contract> {
		const contract = Contract.create(
			data.totalCost,
			data.dateOfSigning,
			data.locationId,
			data.note,
		);
		contracts.push(contract);
		return contract;
	}

	async update(id: string, data: Partial<Contract>): Promise<Contract | null> {
		const contract = contracts.find((c) => c.id === id) ?? null;
		if (!contract) return null;
		Object.assign(contract, data);
		return contract;
	}

	async delete(id: string): Promise<boolean> {
		const index = contracts.findIndex((c) => c.id === id);
		if (index === -1) return false;
		contracts.splice(index, 1);
		return true;
	}
}

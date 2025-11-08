import { IContractRepository, ContractData } from "./contractRepository";
import { Contract } from "./contractEntity";

export class ContractService {
	constructor(private repo: IContractRepository) {}

	async getAll() {
		const all = await this.repo.findAll();
		return all;
	}

	async getById(id: string) {
		const contract = await this.repo.findById(id);
		return contract;
	}

	async create(data: ContractData) {
		const created = await this.repo.create(data);
		return created;
	}

	async update(id: string, data: Partial<Contract>) {
		const updated = await this.repo.update(id, data);
		return updated;
	}

	async delete(id: string) {
		const ok = await this.repo.delete(id);
		return ok;
	}
}

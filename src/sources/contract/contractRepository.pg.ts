import { Repository } from "typeorm";
import { Contract } from "./contractEntity";
import { ContractData, IContractRepository } from "./contractRepository";

export class PgContractRepository implements IContractRepository {
	constructor(private repo: Repository<Contract>) {}

	async findAll(): Promise<Contract[]> {
		const rows = await this.repo.find();
		return rows.map(
			(r) =>
				new Contract(
					r.id,
					r.createdAt,
					r.totalCost,
					r.dateOfSigning,
					r.locationId,
					r.note,
				),
		);
	}

	async findById(id: string): Promise<Contract | null> {
		const row = await this.repo.findOneBy({ id });
		return row
			? new Contract(
					row.id,
					row.createdAt,
					row.totalCost,
					row.dateOfSigning,
					row.locationId,
					row.note,
				)
			: null;
	}

	async create(data: ContractData): Promise<Contract> {
		const entity = this.repo.create(data);
		await this.repo.save(entity);
		return entity;
	}

	async update(id: string, data: Partial<Contract>): Promise<Contract | null> {
		const existing = await this.repo.findOneBy({ id });
		if (!existing) return null;
		Object.assign(existing, data);
		await this.repo.save(existing);
		return new Contract(
			existing.id,
			existing.createdAt,
			existing.totalCost,
			existing.dateOfSigning,
			existing.locationId,
			existing.note,
		);
	}

	async delete(id: string): Promise<boolean> {
		const res = await this.repo.delete(id);
		return res.affected ? res.affected > 0 : false;
	}
}

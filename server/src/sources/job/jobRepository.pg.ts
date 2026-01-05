import { Repository } from "typeorm";
import { Job } from "./jobEntity";
import { JobData, IJobRepository } from "./jobRepository";

export class PgJobRepository implements IJobRepository {
	constructor(private repo: Repository<Job>) {}

	async findAll(): Promise<Job[]> {
		const rows = await this.repo.find();
		return rows.map((r) => new Job(r.id, r.createdAt, r.date, r.contractId, r.note));
	}

	async findById(id: string): Promise<Job | null> {
		const row = await this.repo.findOneBy({ id });
		return row ? new Job(row.id, row.createdAt, row.date, row.contractId, row.note) : null;
	}

	async create(data: JobData): Promise<Job> {
		const entity = this.repo.create(data);
		await this.repo.save(entity);
		return entity;
	}

	async update(id: string, data: Partial<Job>): Promise<Job | null> {
		const existing = await this.repo.findOneBy({ id });
		if (!existing) return null;
		Object.assign(existing, data);
		await this.repo.save(existing);
		return new Job(
			existing.id,
			existing.createdAt,
			existing.date,
			existing.contractId,
			existing.note,
		);
	}

	async delete(id: string): Promise<boolean> {
		const res = await this.repo.delete(id);
		return res.affected ? res.affected > 0 : false;
	}
}

import { Repository } from "typeorm";
import { JobDescription } from "./jobDescriptionEntity";
import { JobDescriptionData, IJobDescriptionRepository } from "./jobDescriptionRepository";

export class PgJobDescriptionRepository implements IJobDescriptionRepository {
	constructor(private repo: Repository<JobDescription>) {}

	async findAll(): Promise<JobDescription[]> {
		const rows = await this.repo.find();
		return rows.map(
			(r) =>
				new JobDescription(
					r.id,
					r.createdAt,
					r.name,
					r.contractId,
					r.cost,
					r.frequency,
					r.period,
				),
		);
	}

	async findById(id: string): Promise<JobDescription | null> {
		const row = await this.repo.findOneBy({ id });
		return row
			? new JobDescription(
					row.id,
					row.createdAt,
					row.name,
					row.contractId,
					row.cost,
					row.frequency,
					row.period,
				)
			: null;
	}

	async create(data: JobDescriptionData): Promise<JobDescription> {
		const entity = this.repo.create(data);
		await this.repo.save(entity);
		return entity;
	}

	async update(id: string, data: Partial<JobDescription>): Promise<JobDescription | null> {
		const existing = await this.repo.findOneBy({ id });
		if (!existing) return null;
		Object.assign(existing, data);
		await this.repo.save(existing);
		return new JobDescription(
			existing.id,
			existing.createdAt,
			existing.name,
			existing.contractId,
			existing.cost,
			existing.frequency,
			existing.period,
		);
	}

	async delete(id: string): Promise<boolean> {
		const res = await this.repo.delete(id);
		return res.affected ? res.affected > 0 : false;
	}
}

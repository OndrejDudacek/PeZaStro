import { IJobRepository, JobData } from "./jobRepository";
import { Job } from "./jobEntity";

export class JobService {
	constructor(private repo: IJobRepository) {}

	async getAll(contractId?: string) {
		const all = await this.repo.findAll(contractId);
		return all;
	}

	async getById(id: string) {
		const job = await this.repo.findById(id);
		return job;
	}

	async create(data: JobData) {
		const created = await this.repo.create(data);
		return created;
	}

	async update(id: string, data: Partial<Job>) {
		const updated = await this.repo.update(id, data);
		return updated;
	}

	async delete(id: string) {
		const ok = await this.repo.delete(id);
		return ok;
	}
}

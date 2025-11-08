import { IJobDescriptionRepository, JobDescriptionData } from "./jobDescriptionRepository";
import { JobDescription } from "./jobDescriptionEntity";

export class JobDescriptionService {
	constructor(private repo: IJobDescriptionRepository) {}

	async getAll() {
		const all = await this.repo.findAll();
		return all;
	}

	async getById(id: string) {
		const jobdescription = await this.repo.findById(id);
		return jobdescription;
	}

	async create(data: JobDescriptionData) {
		const created = await this.repo.create(data);
		return created;
	}

	async update(id: string, data: Partial<JobDescription>) {
		const updated = await this.repo.update(id, data);
		return updated;
	}

	async delete(id: string) {
		const ok = await this.repo.delete(id);
		return ok;
	}
}

import { IJobRepository, JobData } from "./jobRepository";
import { Job } from "./jobEntity";
import { jobs } from "../../db/inMemoryDB";

export class InMemoryJobRepository implements IJobRepository {
	async findAll(contractId?: string): Promise<Job[]> {
		if (!contractId) return [...jobs];

		const filtered = jobs.filter((jd) => jd.contractId === contractId);
		return filtered;
	}

	async findById(id: string): Promise<Job | null> {
		return jobs.find((c) => c.id === id) ?? null;
	}

	async create(data: JobData): Promise<Job> {
		const job = Job.create(data.date, data.contractId, data.note);
		jobs.push(job);
		return job;
	}

	async update(id: string, data: Partial<Job>): Promise<Job | null> {
		const job = jobs.find((c) => c.id === id) ?? null;
		if (!job) return null;
		Object.assign(job, data);
		return job;
	}

	async delete(id: string): Promise<boolean> {
		const index = jobs.findIndex((c) => c.id === id);
		if (index === -1) return false;
		jobs.splice(index, 1);
		return true;
	}
}

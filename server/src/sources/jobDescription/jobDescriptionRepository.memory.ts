import { IJobDescriptionRepository, JobDescriptionData } from "./jobDescriptionRepository";
import { JobDescription } from "./jobDescriptionEntity";
import { jobDescriptions } from "../../db/inMemoryDB";

export class InMemoryJobDescriptionRepository implements IJobDescriptionRepository {
	async findAll(contractId?: string): Promise<JobDescription[]> {
		if (contractId) return [...jobDescriptions];

		const filtered = jobDescriptions.filter((jd) => jd.contractId === contractId);
		return filtered;
	}

	async findById(id: string): Promise<JobDescription | null> {
		return jobDescriptions.find((c) => c.id === id) ?? null;
	}

	async create(data: JobDescriptionData): Promise<JobDescription> {
		const jobdescription = JobDescription.create(
			data.name,
			data.contractId,
			data.cost,
			data.frequency,
			data.period,
		);
		jobDescriptions.push(jobdescription);
		return jobdescription;
	}

	async update(id: string, data: Partial<JobDescription>): Promise<JobDescription | null> {
		const jobdescription = jobDescriptions.find((c) => c.id === id) ?? null;
		if (!jobdescription) return null;
		Object.assign(jobdescription, data);
		return jobdescription;
	}

	async delete(id: string): Promise<boolean> {
		const index = jobDescriptions.findIndex((c) => c.id === id);
		if (index === -1) return false;
		jobDescriptions.splice(index, 1);
		return true;
	}
}

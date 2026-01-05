import { Job } from "./jobEntity";

export type JobData = Omit<Job, "id" | "createdAt">;

export interface IJobRepository {
	findAll(): Promise<Job[]>;
	findById(id: string): Promise<Job | null>;
	create(data: JobData): Promise<Job>;
	update(id: string, data: Partial<JobData>): Promise<Job | null>;
	delete(id: string): Promise<boolean>;
}

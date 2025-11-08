import { JobDescription } from "./jobDescriptionEntity";

export type JobDescriptionData = Omit<JobDescription, "id" | "createdAt">;

export interface IJobDescriptionRepository {
	findAll(): Promise<JobDescription[]>;
	findById(id: string): Promise<JobDescription | null>;
	create(data: JobDescriptionData): Promise<JobDescription>;
	update(id: string, data: Partial<JobDescriptionData>): Promise<JobDescription | null>;
	delete(id: string): Promise<boolean>;
}

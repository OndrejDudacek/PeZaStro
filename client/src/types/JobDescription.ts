export enum Frequency {
	month = "month",
	year = "year",
}

export interface JobDescription {
	id: string;
	createdAt: string;
	name: string;
	contractId: string;
	cost: number;
	frequency: Frequency | null;
	period: number | null;
}

export interface JobDescriptionCreate {
	name: string;
	contractId: string;
	cost: number;
	frequency?: Frequency | null;
	period?: number | null;
}

export interface JobDescriptionUpdate {
	name?: string;
	contractId?: string;
	cost?: number;
	frequency?: Frequency | null;
	period?: number | null;
}

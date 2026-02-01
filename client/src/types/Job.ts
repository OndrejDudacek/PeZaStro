export interface Job {
	id: string;
	createdAt: string;
	date: string;
	contractId: string;
	note: string;
}

export interface JobCreate {
	date: Date;
	contractId: string;
	note: string;
}

export interface JobUpdate {
	date?: Date;
	contractId?: string;
	note?: string;
}

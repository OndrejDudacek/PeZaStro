export interface Contract {
	id: string;
	createdAt: string;
	totalCost: number;
	dateOfSigning: string;
	locationId: string;
	note: string | null;
}

export interface ContractCreate {
	totalCost: number;
	dateOfSigning: Date;
	locationId: string;
	note?: string | null;
}

export interface ContractUpdate {
	totalCost?: number;
	dateOfSigning?: Date;
	locationId?: string;
	note?: string | null;
}

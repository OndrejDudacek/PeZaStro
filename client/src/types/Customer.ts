export interface Customer {
	id: string;
	createdAt: Date;
	name: string;
	note: string | null;
}

export interface CustomerCreate {
	name: string;
	note?: string | null;
}

export interface CustomerUpdate {
	name?: string;
	note?: string | null;
}

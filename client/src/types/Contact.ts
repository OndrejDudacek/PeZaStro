export interface Contact {
	id: string;
	createdAt: string;
	name: string;
	customerId: string;
	phone: number | null;
	email: string | null;
}

export interface ContactCreate {
	name: string;
	customerId: string;
	phone?: number | null;
	email?: string | null;
}

export interface ContactUpdate {
	name?: string;
	customerId?: string;
	phone?: number | null;
	email?: string | null;
}

export interface Address {
	street: string;
	houseNumber: number;
	postalCode: number;
	city: string;
}

export interface Location {
	id: string;
	createdAt: string;
	address: Address;
	customerId: string;
	note: string | null;
}

export interface LocationCreate {
	address: Address;
	customerId: string;
	note?: string | null;
}

export interface LocationUpdate {
	address?: Partial<Address>;
	customerId?: string;
	note?: string | null;
}

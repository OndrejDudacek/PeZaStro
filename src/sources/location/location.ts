import Source from "../../utils/sourceTemplate";
import { locations } from "../../utils/inMemoryDB";

interface Address {
	street: string;
	houseNumber: number;
	postalCode: string;
	city: string;
}

class Location extends Source {
	address: Address;
	customerId: string;
	note?: string;

	constructor(address: Address, customerId: string, note?: string) {
		super();

		this.address = address;
		this.customerId = customerId;
		this.note = note;
	}

	read() {
		return {
			id: this.id,
			createdAt: this.createdAt,
			address: this.address,
			customerId: this.customerId,
			note: this.note,
		};
	}

	update(data: Partial<Omit<Location, keyof Source>>) {
		if (data.address !== undefined) this.address = data.address;
		if (data.customerId !== undefined) this.customerId = data.customerId;
		if (data.note !== undefined) this.note = data.note;
	}

	delete() {
		locations.splice(locations.indexOf(this), 1);
	}
}

export default Location;

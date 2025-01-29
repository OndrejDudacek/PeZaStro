import Source from "../../utils/sourceTemplate";

interface Address {
	streetAndNumber: string;
	city: string;
}

class Location extends Source {
	address: Address;
	customerId: string;
	note: string | null;

	constructor(address: Address, customerId: string, note: string | null) {
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
}

export default Location;

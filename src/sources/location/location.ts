import Source from "../sourceTemplate";

interface Address {
	streetAndNumber: string;
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
}

export default Location;

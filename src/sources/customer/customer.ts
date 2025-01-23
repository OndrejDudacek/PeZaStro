import Source from "../sourceTemplate";

class Customer extends Source {
	name: string;
	note?: string;

	constructor(name: string, note?: string) {
		super();
		this.name = name;
		this.note = note;
	}
}

export default Customer;

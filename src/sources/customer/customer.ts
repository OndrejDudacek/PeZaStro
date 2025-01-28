import Source from "../../utils/sourceTemplate";

interface CustomerData extends Omit<Customer, keyof Source> {}

class Customer extends Source {
	name: string;
	note: string | null;

	constructor(name: string, note: string | null) {
		super();
		this.name = name;
		this.note = note;
	}

	read(): {
		id: string;
		createdAt: string;
		name: string;
		note: string | null;
	} {
		return {
			id: this.id,
			createdAt: this.createdAt,
			name: this.name,
			note: this.note,
		};
	}

	update(data: Partial<CustomerData>) {
		if (data.name !== undefined) this.name = data.name;
		if (data.note !== undefined) this.note = data.note;
	}
}

export default Customer;

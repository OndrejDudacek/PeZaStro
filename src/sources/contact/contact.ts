import Source from "../../utils/sourceTemplate";

class Contact extends Source {
	name: string;
	phone: number;
	email: string;
	customerId: string;

	constructor(
		name: string,
		phone: number,
		email: string,
		customerId: string
	) {
		super();
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.customerId = customerId;
	}

	read() {
		return {
			id: this.id,
			createdAt: this.createdAt,
			name: this.name,
			phone: this.phone,
			email: this.email,
			customerId: this.customerId,
		};
	}

	update(data: Partial<Omit<Contact, keyof Source>>) {
		if (data.name !== undefined) this.name = data.name;
		if (data.phone !== undefined) this.phone = data.phone;
		if (data.email !== undefined) this.email = data.email;
		if (data.customerId !== undefined) this.customerId = data.customerId;
	}
}

export default Contact;

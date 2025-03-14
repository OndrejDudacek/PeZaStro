import Source from "../../utils/sourceTemplate";
import { contacts } from "../../utils/db";

class Contact extends Source {
	name: string;
	customerId: string;
	phone?: number;
	email?: string;

	constructor(
		name: string,
		customerId: string,
		phone?: number,
		email?: string
	) {
		super();

		this.name = name;
		this.customerId = customerId;
		this.phone = phone;
		this.email = email;

		contacts.push(this);
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

	delete() {
		contacts.splice(contacts.indexOf(this), 1);
	}
}

export default Contact;

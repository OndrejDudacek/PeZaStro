import Source from "../../utils/sourceTemplate";

export class Contact extends Source {
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
	}
}

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
}

export default Contact;

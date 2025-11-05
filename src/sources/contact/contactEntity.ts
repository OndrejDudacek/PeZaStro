import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class Contact {
	@PrimaryColumn()
	id!: string;

	@Column()
	createdAt!: Date;

	@Column()
	name!: string;

	@Column()
	customerId!: string;

	@Column({ nullable: true })
	phone?: number;

	@Column({ nullable: true })
	email?: string;

	@BeforeInsert()
	private setDefaults() {
		if (!this.id) this.id = uuidv4();
		if (!this.createdAt) this.createdAt = new Date();
	}

	constructor(
		id?: string,
		createdAt?: Date,
		name?: string,
		customerId?: string,
		phone?: number,
		email?: string,
	) {
		if (id) this.id = id;
		if (createdAt) this.createdAt = createdAt;
		if (name) this.name = name;
		if (customerId) this.customerId = customerId;
		if (phone) this.phone = phone;
		if (email) this.email = email;
	}

	static create(name: string, customerId: string, phone?: number, email?: string): Contact {
		const newId = uuidv4();
		const newDate = new Date();
		const newContact = new Contact(newId, newDate, name, customerId, phone, email);
		return newContact;
	}
}

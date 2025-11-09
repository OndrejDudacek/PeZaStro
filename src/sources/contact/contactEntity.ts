import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class Contact {
	@PrimaryColumn({ type: "uuid" })
	id!: string;

	@Column()
	createdAt!: Date;

	@Column()
	name!: string;

	@Column()
	customerId!: string;

	@Column({ type: "integer", nullable: true })
	phone?: number | null;

	@Column({ type: "text", nullable: true })
	email?: string | null;

	@BeforeInsert()
	private setDefaults() {
		if (!this.id) this.id = uuidv4();
		if (!this.createdAt) this.createdAt = new Date();
		if (this.phone === undefined) this.phone = null;
		if (this.email === undefined) this.email = null;
	}

	constructor(
		id?: string,
		createdAt?: Date,
		name?: string,
		customerId?: string,
		phone?: number | null,
		email?: string | null,
	) {
		if (id) this.id = id;
		if (createdAt) this.createdAt = createdAt;
		if (name) this.name = name;
		if (customerId) this.customerId = customerId;
		if (phone) {
			this.phone = phone;
		} else {
			this.phone = null;
		}
		if (email) {
			this.email = email;
		} else {
			this.email = null;
		}
	}

	static create(
		name: string,
		customerId: string,
		phone?: number | null,
		email?: string | null,
	): Contact {
		const newId = uuidv4();
		const newDate = new Date();
		const newContact = new Contact(newId, newDate, name, customerId, phone, email);
		return newContact;
	}
}

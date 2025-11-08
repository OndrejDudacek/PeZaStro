import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class Customer {
	@PrimaryColumn()
	id!: string;

	@Column()
	createdAt!: Date;

	@Column()
	name!: string;

	@Column({ nullable: true })
	note?: string | null;

	@BeforeInsert()
	private setDefaults() {
		if (!this.id) this.id = uuidv4();
		if (!this.createdAt) this.createdAt = new Date();
		if (this.note === undefined) this.note = null;
	}

	constructor(id?: string, createdAt?: Date, name?: string, note?: string | null) {
		if (id) this.id = id;
		if (createdAt) this.createdAt = createdAt;
		if (name) this.name = name;
		if (note) {
			this.note = note;
		} else {
			this.note = null;
		}
	}

	static create(name: string, note?: string | null): Customer {
		const newId = uuidv4();
		const newDate = new Date();
		const newCustomer = new Customer(newId, newDate, name, note);
		return newCustomer;
	}
}

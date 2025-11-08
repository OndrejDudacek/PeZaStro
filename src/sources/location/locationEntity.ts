import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, BeforeInsert } from "typeorm";

export interface Address {
	street: string;
	houseNumber: number;
	postalCode: string;
	city: string;
}

@Entity()
export class Location {
	@PrimaryColumn()
	id!: string;

	@Column()
	createdAt!: Date;

	@Column({ type: "simple-json" })
	address!: Address;

	@Column()
	customerId!: string;

	@Column({ nullable: true })
	note?: string | null;

	@BeforeInsert()
	private setDefaults() {
		if (!this.id) this.id = uuidv4();
		if (!this.createdAt) this.createdAt = new Date();
		if (this.note === undefined) this.note = null;
	}

	constructor(
		id?: string,
		createdAt?: Date,
		address?: Address,
		customerId?: string,
		note?: string | null,
	) {
		if (id) this.id = id;
		if (createdAt) this.createdAt = createdAt;
		if (address) this.address = address;
		if (customerId) this.customerId = customerId;
		if (note) {
			this.note = note;
		} else {
			this.note = null;
		}
	}

	static create(address: Address, customerId: string, note?: string | null): Location {
		const newId = uuidv4();
		const newDate = new Date();
		const newLocation = new Location(newId, newDate, address, customerId, note);
		return newLocation;
	}
}

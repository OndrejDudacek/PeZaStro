import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class Job {
	@PrimaryColumn({ type: "uuid" })
	id!: string;

	@Column()
	createdAt!: Date;

	@Column()
	date!: Date;

	@Column()
	contractId!: string;

	@Column({ type: "text" })
	note!: string;

	@BeforeInsert()
	private setDefaults() {
		if (!this.id) this.id = uuidv4();
		if (!this.createdAt) this.createdAt = new Date();
	}

	constructor(
		id?: string,
		createdAt?: Date,
		date?: Date,
		contractId?: string,
		note?: string | null,
	) {
		if (id) this.id = id;
		if (createdAt) this.createdAt = createdAt;
		if (date) this.date = date;
		if (contractId) this.contractId = contractId;
		if (note) this.note = note;
	}

	static create(date: Date, contractId: string, note: string): Job {
		const newId = uuidv4();
		const newDate = new Date();
		const newJob = new Job(newId, newDate, date, contractId, note);
		return newJob;
	}
}

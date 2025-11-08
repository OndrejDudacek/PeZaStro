import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class Contract {
	@PrimaryColumn()
	id!: string;

	@Column()
	createdAt!: Date;

	@Column()
	totalCost!: number;

	@Column()
	dateOfSigning!: Date;

	@Column()
	locationId!: string;

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
		totalCost?: number,
		dateOfSigning?: Date,
		locationId?: string,
		note?: string | null,
	) {
		if (id) this.id = id;
		if (createdAt) this.createdAt = createdAt;
		if (totalCost) this.totalCost = totalCost;
		if (dateOfSigning) this.dateOfSigning = dateOfSigning;
		if (locationId) this.locationId = locationId;
		if (note) {
			this.note = note;
		} else {
			this.note = null;
		}
	}

	static create(
		totalCost: number,
		dateOfSigning: Date,
		locationId: string,
		note?: string | null,
	) {
		const newId = uuidv4();
		const newDate = new Date();
		const newContract = new Contract(
			newId,
			newDate,
			totalCost,
			dateOfSigning,
			locationId,
			note,
		);
		return newContract;
	}
}

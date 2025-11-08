import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, BeforeInsert } from "typeorm";

export enum Frequency {
	month = "month",
	year = "year",
}

@Entity()
export class JobDescription {
	@PrimaryColumn()
	id!: string;

	@Column()
	createdAt!: Date;

	@Column()
	name!: string;

	@Column()
	contractId!: string;

	@Column({ nullable: true })
	cost?: number | null;

	@Column({ nullable: true, type: "enum", enum: Frequency })
	frequency?: Frequency | null;

	@Column({ nullable: true })
	period?: number | null;

	@BeforeInsert()
	private setDefaults() {
		if (!this.id) this.id = uuidv4();
		if (!this.createdAt) this.createdAt = new Date();
		if (this.cost === undefined) this.cost = null;
		if (this.frequency === undefined) this.frequency = null;
		if (this.period === undefined) this.period = null;
	}

	constructor(
		id?: string,
		createdAt?: Date,
		name?: string,
		contractId?: string,
		cost?: number | null,
		frequency?: Frequency | null,
		period?: number | null,
	) {
		if (id) this.id = id;
		if (createdAt) this.createdAt = createdAt;
		if (name) this.name = name;
		if (contractId) this.contractId = contractId;
		if (cost) {
			this.cost = cost;
		} else {
			this.cost = null;
		}
		if (frequency) {
			this.frequency = frequency;
		} else {
			this.frequency = null;
		}
		if (period) {
			this.period = period;
		} else {
			this.period = null;
		}
	}

	static create(
		name: string,
		contractId: string,
		cost?: number | null,
		frequency?: Frequency | null,
		period?: number | null,
	): JobDescription {
		const newId = uuidv4();
		const newDate = new Date();
		const newJobDescription = new JobDescription(
			newId,
			newDate,
			name,
			contractId,
			cost,
			frequency,
			period,
		);
		return newJobDescription;
	}
}

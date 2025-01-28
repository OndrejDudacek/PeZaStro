import Source from "../../utils/sourceTemplate";

interface JobDescriptionData extends Omit<JobDescription, keyof Source> {}

enum Period {
	month,
	year,
}

class JobDescription extends Source {
	name: string;
	contractId: string;
	cost: number | null;
	frequency: number | null;
	period: Period | null;

	constructor(
		name: string,
		contractId: string,
		cost: number | null,
		frequency: number | null,
		period: Period | null
	) {
		super();

		this.name = name;
		this.contractId = contractId;
		this.cost = cost;
		this.frequency = frequency;
		this.period = period;
	}

	read() {
		return {
			id: this.id,
			createdAt: this.createdAt,
			name: this.name,
			contractId: this.contractId,
			cost: this.cost,
			frequency: this.frequency,
			period: this.period,
		};
	}

	update(data: Partial<JobDescriptionData>) {
		if (data.name !== undefined) this.name = data.name;
		if (data.contractId !== undefined) this.contractId = data.contractId;
		if (data.cost !== undefined) this.cost = data.cost;
		if (data.frequency !== undefined) this.frequency = data.frequency;
		if (data.period !== undefined) this.period = data.period;
	}
}

export default JobDescription;

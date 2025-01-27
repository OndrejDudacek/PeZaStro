import Source from "../../utils/sourceTemplate";

enum Period {
	month,
	year,
}

class JobDescription extends Source {
	name: string;
	contractId: string;
	cost?: number;
	frequency?: number;
	period?: Period;

	constructor(
		name: string,
		contractId: string,
		cost?: number,
		frequency?: number,
		period?: Period
	) {
		super();

		this.name = name;
		this.contractId = contractId;
		this.cost = cost;
		this.frequency = frequency;
		this.period = period;
	}
}

export default JobDescription;

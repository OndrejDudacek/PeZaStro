import Source from "../../utils/sourceTemplate";

class Job extends Source {
	date: string;
	note: string;
	contractId: string;

	constructor(date: string, note: string, contractId: string) {
		super();

		this.date = date;
		this.note = note;
		this.contractId = contractId;
	}
}

export default Job;

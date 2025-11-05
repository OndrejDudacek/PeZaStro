import Source from "../../utils/sourceTemplate";
import { jobs } from "../../db/inMemoryDB";

class Job extends Source {
	date: string;
	note: string;
	contractId: string;

	constructor(date: string, note: string, contractId: string) {
		super();

		this.date = date;
		this.note = note;
		this.contractId = contractId;

		jobs.push(this);
	}

	read() {
		return {
			id: this.id,
			createdAt: this.createdAt,
			date: this.date,
			note: this.note,
			contractId: this.contractId,
		};
	}

	update(data: Partial<Omit<Job, keyof Source>>) {
		if (data.date !== undefined) this.date = data.date;
		if (data.note !== undefined) this.note = data.note;
		if (data.contractId !== undefined) this.contractId = data.contractId;
	}

	delete() {
		jobs.splice(jobs.indexOf(this), 1);
	}
}

export default Job;

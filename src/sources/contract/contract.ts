import Source from "../../utils/sourceTemplate";

interface ContractData extends Omit<Contract, keyof Source> {}

class Contract extends Source {
	totalCost: number;
	dateOfSigning: string;
	locationId: string;
	note: string | null;

	constructor(
		totalCost: number,
		dateOfSigning: string,
		locationId: string,
		note: string | null
	) {
		super();
		this.totalCost = totalCost;
		this.dateOfSigning = dateOfSigning;
		this.locationId = locationId;
		this.note = note;
	}

	read() {
		return {
			id: this.id,
			createdAt: this.createdAt,
			totalCost: this.totalCost,
			dateOfSigning: this.dateOfSigning,
			locationId: this.locationId,
			note: this.note,
		};
	}

	update(data: Partial<ContractData>) {
		if (data.totalCost !== undefined) this.totalCost = data.totalCost;
		if (data.dateOfSigning !== undefined)
			this.dateOfSigning = data.dateOfSigning;
		if (data.locationId !== undefined) this.locationId = data.locationId;
		if (data.note !== undefined) this.note = data.note;
	}
}

export default Contract;

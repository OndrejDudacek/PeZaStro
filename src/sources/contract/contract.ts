import Source from "../../utils/sourceTemplate";

class Contract extends Source {
	totalCost: number;
	dateOfSigning: string;
	locationId: string;
	note?: string;

	constructor(
		totalCost: number,
		dateOfSigning: string,
		locationId: string,
		note?: string
	) {
		super();
		this.totalCost = totalCost;
		this.dateOfSigning = dateOfSigning;
		this.locationId = locationId;
		this.note = note;
	}
}

export default Contract;

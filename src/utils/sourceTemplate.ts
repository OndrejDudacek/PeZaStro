import { v4 as uuidv4 } from "uuid";

class Source {
	id: string;
	createdAt: string;

	constructor() {
		this.id = uuidv4();
		const date = new Date();
		this.createdAt = date.toUTCString();
	}
}

export default Source;

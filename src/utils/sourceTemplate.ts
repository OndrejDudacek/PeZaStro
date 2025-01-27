import uniqid from "uniqid";

class Source {
	id: string;
	createdAt: string;

	constructor() {
		this.id = uniqid();
    const date = new Date();
		this.createdAt = date.toUTCString();
	}
}

export default Source;

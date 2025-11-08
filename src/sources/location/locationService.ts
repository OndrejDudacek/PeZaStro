import { ILocationRepository, LocationData } from "./locationRepository";
import { Location } from "./locationEntity";

export class LocationService {
	constructor(private repo: ILocationRepository) {}

	async getAll() {
		const all = await this.repo.findAll();
		return all;
	}

	async getById(id: string) {
		const location = await this.repo.findById(id);
		return location;
	}

	async create(data: LocationData) {
		const created = await this.repo.create(data);
		return created;
	}

	async update(id: string, data: Partial<Location>) {
		const updated = await this.repo.update(id, data);
		return updated;
	}

	async delete(id: string) {
		const ok = await this.repo.delete(id);
		return ok;
	}
}

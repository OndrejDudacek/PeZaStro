import { ILocationRepository, LocationData } from "./locationRepository";
import { Location } from "./locationEntity";
import { locations } from "../../db/inMemoryDB";

export class InMemoryLocationRepository implements ILocationRepository {
	async findAll(): Promise<Location[]> {
		return [...locations];
	}

	async findById(id: string): Promise<Location | null> {
		return locations.find((c) => c.id === id) ?? null;
	}

	async create(data: LocationData): Promise<Location> {
		const location = Location.create(data.address, data.customerId, data.note);
		locations.push(location);
		return location;
	}

	async update(id: string, data: Partial<Location>): Promise<Location | null> {
		const location = locations.find((c) => c.id === id) ?? null;
		if (!location) return null;
		Object.assign(location, data);
		return location;
	}

	async delete(id: string): Promise<boolean> {
		const index = locations.findIndex((c) => c.id === id);
		if (index === -1) return false;
		locations.splice(index, 1);
		return true;
	}
}

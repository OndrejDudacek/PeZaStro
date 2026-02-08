import { Repository } from "typeorm";
import { Location } from "./locationEntity";
import { LocationData, ILocationRepository } from "./locationRepository";

export class PgLocationRepository implements ILocationRepository {
	constructor(private repo: Repository<Location>) {}

	async findAll(): Promise<Location[]> {
		const rows = await this.repo.find();
		return rows.map(
			(r) => new Location(r.id, r.createdAt, r.address, r.customerId, r.note),
		);
	}

	async findById(id: string): Promise<Location | null> {
		const row = await this.repo.findOneBy({ id });
		return row
			? new Location(row.id, row.createdAt, row.address, row.customerId, row.note)
			: null;
	}

	async create(data: LocationData): Promise<Location> {
		const entity = this.repo.create(data);
		await this.repo.save(entity);
		return entity;
	}

	async update(id: string, data: Partial<Location>): Promise<Location | null> {
		const existing = await this.repo.findOneBy({ id });
		if (!existing) return null;

		if (data.address) {
			existing.address = { ...existing.address, ...data.address };
			delete data.address;
		}

		Object.assign(existing, data);
		await this.repo.save(existing);
		return new Location(
			existing.id,
			existing.createdAt,
			existing.address,
			existing.customerId,
			existing.note,
		);
	}

	async delete(id: string): Promise<boolean> {
		const res = await this.repo.delete(id);
		return res.affected ? res.affected > 0 : false;
	}
}

import { Repository } from "typeorm";
import { User } from "./userEntity";
import { UserData, IUserRepository } from "./userRepository";

export class PgUserRepository implements IUserRepository {
	constructor(private repo: Repository<User>) {}

	async findAll(): Promise<User[]> {
		const rows = await this.repo.find();
		return rows.map((r) => new User(r.id, r.createdAt, r.username, r.password));
	}

	async findById(id: string): Promise<User | null> {
		const row = await this.repo.findOneBy({ id });
		return row ? new User(row.id, row.createdAt, row.username, row.password) : null;
	}

	async findByUsername(username: string): Promise<User | null> {
		const row = await this.repo.findOneBy({ username });
		return row ? new User(row.id, row.createdAt, row.username, row.password) : null;
	}

	async create(data: UserData): Promise<User> {
		const entity = this.repo.create(data);
		await this.repo.save(entity);
		return entity;
	}

	async update(id: string, data: Partial<User>): Promise<User | null> {
		const existing = await this.repo.findOneBy({ id });
		if (!existing) return null;
		Object.assign(existing, data);
		await this.repo.save(existing);
		return new User(existing.id, existing.createdAt, existing.username, existing.password);
	}

	async delete(id: string): Promise<boolean> {
		const res = await this.repo.delete(id);
		return res.affected ? res.affected > 0 : false;
	}
}

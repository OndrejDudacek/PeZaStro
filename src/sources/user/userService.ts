import { IUserRepository, UserData } from "./userRepository";
import { User } from "./userEntity";

export class UserService {
	constructor(private repo: IUserRepository) {}

	async getAll() {
		const all = await this.repo.findAll();
		return all;
	}

	async getById(id: string) {
		const user = await this.repo.findById(id);
		return user;
	}

	async create(data: UserData) {
		const created = await this.repo.create(data);
		return created;
	}

	async update(id: string, data: Partial<User>) {
		const updated = await this.repo.update(id, data);
		return updated;
	}

	async delete(id: string) {
		const ok = await this.repo.delete(id);
		return ok;
	}
}

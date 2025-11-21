import { IUserRepository, UserData } from "./userRepository";
import { User } from "./userEntity";
import { EntityAlreadyExistsErrorr } from "../../customErrors";

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

	async getByUsername(username: string) {
		const user = await this.repo.findByUsername(username);
		return user;
	}

	async create(data: UserData) {
		const existingUser = await this.repo.findByUsername(data.username);
		if (existingUser)
			throw new EntityAlreadyExistsErrorr(
				`User with this (${data.username}) username already exists`,
			);

		const created = await this.repo.create(data);
		if (!created) throw new Error("Error when creating a user");

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

import { IUserRepository, UserData } from "./userRepository";
import { User } from "./userEntity";
import { users } from "../../db/inMemoryDB";

export class InMemoryUserRepository implements IUserRepository {
	async findAll(): Promise<User[]> {
		return [...users];
	}

	async findById(id: string): Promise<User | null> {
		return users.find((c) => c.id === id) ?? null;
	}

	async findByUsername(username: string): Promise<User | null> {
		return users.find((c) => c.username === username) ?? null;
	}

	async create(data: UserData): Promise<User> {
		const user = User.create(data.username, data.password);
		users.push(user);
		return user;
	}

	async update(id: string, data: Partial<User>): Promise<User | null> {
		const user = users.find((c) => c.id === id) ?? null;
		if (!user) return null;
		Object.assign(user, data);
		return user;
	}

	async delete(id: string): Promise<boolean> {
		const index = users.findIndex((c) => c.id === id);
		if (index === -1) return false;
		users.splice(index, 1);
		return true;
	}
}

import { User } from "./userEntity";

export type UserData = Omit<User, "id" | "createdAt">;

export interface IUserRepository {
	findAll(): Promise<User[]>;
	findById(id: string): Promise<User | null>;
	findByUsername(username: string): Promise<User | null>;
	create(data: UserData): Promise<User | null>;
	update(id: string, data: Partial<UserData>): Promise<User | null>;
	delete(id: string): Promise<boolean>;
}

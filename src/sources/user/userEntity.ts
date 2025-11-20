import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class User {
	@PrimaryColumn({ type: "uuid" })
	id!: string;

	@Column()
	createdAt!: Date;

	@Column({ unique: true })
	username!: string;

	@Column()
	password!: string;

	@BeforeInsert()
	private setDefaults() {
		if (!this.id) this.id = uuidv4();
		if (!this.createdAt) this.createdAt = new Date();
	}

	constructor(id?: string, createdAt?: Date, name?: string, password?: string) {
		if (id) this.id = id;
		if (createdAt) this.createdAt = createdAt;
		if (this.username) this.username = this.username;
		if (password) this.password = password;
	}

	static create(username: string, password: string): User {
		const newId = uuidv4();
		const newDate = new Date();
		const newUser = new User(newId, newDate, username, password);
		return newUser;
	}
}

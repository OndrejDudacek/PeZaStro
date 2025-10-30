import Source from "../../utils/sourceTemplate";
import { users } from "../../utils/inMemoryDB";

class User extends Source {
	username: string;
	password: string;

	constructor(username: string, password: string) {
		super();

		this.username = username;
		this.password = password;

		users.push(this);
	}

	read() {
		return {
			id: this.id,
			createdAt: this.createdAt,
			username: this.username,
			password: this.password,
		};
	}

	update(data: Partial<Omit<User, keyof Source>>) {
		if (data.username !== undefined) this.username = data.username;
		if (data.password !== undefined) this.password = data.password;
	}

	delete() {
		users.splice(users.indexOf(this), 1);
	}
}

export default User;

import Source from "../../utils/sourceTemplate";

interface UserData extends Omit<User, keyof Source> {}

class User extends Source {
	username: string;
	password: string;

	constructor(username: string, password: string) {
		super();

		this.username = username;
		this.password = password;
	}

	read() {
		return {
			id: this.id,
			createdAt: this.createdAt,
			username: this.username,
			password: this.password,
		};
	}

	update(data: Partial<UserData>) {
		if (data.username !== undefined) this.username = data.username;
		if (data.password !== undefined) this.password = data.password;
	}
}

export default User;

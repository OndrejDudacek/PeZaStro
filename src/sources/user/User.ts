import Source from "../sourceTemplate";

class User extends Source {
	username: string;
	password: string;

	constructor(username: string, password: string) {
		super();

		this.username = username;
		this.password = password;
	}
}

export default User;

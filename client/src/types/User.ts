export interface UserLogin {
	username: string;
	password: string;
}

export interface UserLoginResponse {
	token: string;
	id: string;
	username: string;
}

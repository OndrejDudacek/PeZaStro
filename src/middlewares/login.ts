import jwt from "jsonwebtoken";
import { UserService } from "../sources/user/userService";
import express, { NextFunction } from "express";
import { BadRequestError } from "../customErrors";

export const login = async (
	username: string,
	password: string,
	service: UserService,
	req: express.Request,
	res: express.Response,
	next: NextFunction,
) => {
	const user = await service.getByUsername(username);
	if (!user || user.password !== password) {
		console.error("Wrong username or password");
		return next(new BadRequestError("Wrong username or password"));
	}

	const token = jwt.sign(
		{ userId: user.id, username: user.username },
		process.env.JWT_SECRET ?? "DeFaUlT_SeCr3t",
		{ expiresIn: "1d" },
	);

	res.json({ token: token, userId: user.id, username: user.username });
};

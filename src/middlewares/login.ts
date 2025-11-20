import jwt from "jsonwebtoken";
import { IUserRepository } from "../sources/user/userRepository";
import express, { NextFunction } from "express";
import { BadRequestError } from "../customErrors";

export const login = (username: string, password: string, userRepository: IUserRepository) => {
	return async (req: express.Request, res: express.Response, next: NextFunction) => {
		const user = await userRepository.findByUsername(username);
		if (!user || user.password !== password)
			return next(new BadRequestError("Wrong username or password"));

		const token = jwt.sign(
			{ userId: user.id, username: user.username },
			process.env.JWT_SECRET ?? "DeFaUlT_SeCr3t",
			{ expiresIn: "1d" },
		);

		res.json({ token: token, userId: user.id, username: user.username });
	};
};

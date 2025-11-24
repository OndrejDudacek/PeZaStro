import jwt from "jsonwebtoken";
import express, { NextFunction } from "express";
import { UnauthorizedError } from "../customErrors";

export const authorize = async (
	req: express.Request,
	res: express.Response,
	next: NextFunction,
) => {
	if (!req.headers.authorization) {
		return next(new UnauthorizedError("Missing token in Authorization header"));
	}

	const token = req.headers.authorization.replace(/bearer /i, "");

	try {
		jwt.verify(token, process.env.JWT_SECRET ?? "DeFaUlT_SeCr3t");
	} catch (error) {
		return next(new UnauthorizedError("Invalid or expired token"));
	}

	next();
};

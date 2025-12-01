import rateLimit from "express-rate-limit";
import { ToManyRequestError } from "../customErrors";

export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: true,
	legacyHeaders: false,
	ipv6Subnet: 56,
	handler: (req, res, next) =>
		next(new ToManyRequestError("Too many requests, please try again later.")),
});

export const loginLimiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	limit: 5,
	standardHeaders: true,
	legacyHeaders: false,
	ipv6Subnet: 56,
	handler: (req, res, next) =>
		next(new ToManyRequestError("Too many requests, please try again later.")),
});

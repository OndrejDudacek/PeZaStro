import { Request, Response, NextFunction } from "express";
import { customError } from "../utils/errors";

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof customError) {
		res.status(err.statusCode).json({ message: err.message });
		return;
	} else {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export default errorHandler;

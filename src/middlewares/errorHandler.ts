import { Request, Response, NextFunction } from "express";
import { customError } from "../customErrors";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof customError) {
		res.status(err.statusCode).json({ message: err.message });
		return;
	} else {
		res.status(500).json({ message: "Internal Server Error" });
	}
	console.error(err);
};

export default errorHandler;

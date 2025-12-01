import { Request, Response, NextFunction } from "express";
import { customError } from "../customErrors";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof customError) {
		res.status(err.statusCode).json({ message: err.message });
		console.error(
			`Status: ${err.statusCode}; Message:  ${err.message}; Time: ${new Date().toUTCString()}`,
		);
	} else {
		res.status(500).json({ message: "Internal Server Error" });
		console.error(
			`Status: ${500}; Message:  ${err.message}; Error: ${err}; Time: ${new Date().toUTCString()}`,
		);
	}
};

export default errorHandler;

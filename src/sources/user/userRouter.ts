import express, { NextFunction } from "express";
import { container } from "../../db/diDbContainer";
import { UserService } from "./userService";
import { ValidateUserSchema } from "./userSchema";
import { BadRequestError } from "../../customErrors";
import { login } from "../../middlewares/login";

const userRouter: express.Router = express.Router();

const service = new UserService(container.userRepository);

userRouter.post(
	"/login",
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { error: userDataError } = ValidateUserSchema.validate(req.body);
			if (userDataError) return next(new BadRequestError(userDataError.message));

			const { username, password } = req.body;

			await login(username, password, service, req, res, next);
		} catch (error) {
			next(error);
		}
	},
);

export default userRouter;

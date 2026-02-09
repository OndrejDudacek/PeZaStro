import express, { NextFunction } from "express";
import { container } from "../../db/diDbContainer";
import { UserService } from "./userService";
import { ValidateUserSchema, CreateUserSchema, UpdateUserSchema } from "./userSchema";
import { BadRequestError, NotFoundError } from "../../customErrors";
import { login } from "../../middlewares/login";
import { loginLimiter } from "../../middlewares/rateLimits";
import { authorize } from "../../middlewares/authorize";
import { idSchema } from "../../utils/idSchema";

const userRouter: express.Router = express.Router();

const service = new UserService(container.userRepository);

userRouter.post(
	"/login",
	loginLimiter,
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

userRouter.get(
	"/",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const all = await service.getAll();
			res.json(all);
		} catch (error) {
			next(error);
		}
	},
);

userRouter.get(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { error: idError } = idSchema.validate(req.params.id);
			if (idError) {
				next(new BadRequestError(idError.message));
				return;
			}

			const user = await service.getById(req.params.id);
			if (user === null) {
				next(new NotFoundError("User not found"));
				return;
			}

			res.json(user);
		} catch (error) {
			next(error);
		}
	},
);

userRouter.post(
	"/",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { error: createUserError } = CreateUserSchema.validate(req.body);
			if (createUserError) {
				next(new BadRequestError(createUserError.message));
				return;
			}

			const user = await service.create(req.body);
			res.status(201).json(user);
		} catch (error) {
			next(error);
		}
	},
);

userRouter.patch(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { error: idError } = idSchema.validate(req.params.id);
			if (idError) {
				next(new BadRequestError(idError.message));
				return;
			}

			const { error: updateUserError } = UpdateUserSchema.validate(req.body);
			if (updateUserError) {
				next(new BadRequestError(updateUserError.message));
				return;
			}

			const user = await service.update(req.params.id, req.body);
			if (user === null) {
				next(new NotFoundError("User not found"));
				return;
			}

			res.json(user);
		} catch (error) {
			next(error);
		}
	},
);

userRouter.delete(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { error: idError } = idSchema.validate(req.params.id);
			if (idError) {
				next(new BadRequestError(idError.message));
				return;
			}

			const deleted = await service.delete(req.params.id);

			if (!deleted) {
				next(new NotFoundError("User not found"));
				return;
			}

			res.json({ message: "User deleted" });
		} catch (error) {
			next(error);
		}
	},
);

export default userRouter;

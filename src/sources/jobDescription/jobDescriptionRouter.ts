import express, { NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../customErrors";
import {
	UpdateJobDescriptionSchema,
	CreateJobDescriptionSchema,
} from "./jobDescriptionSchemas";
import { idSchema } from "../../utils/idSchema";
import { container } from "../../db/diDbContainer";
import { JobDescriptionService } from "./jobDescriptionService";
import { authorize } from "../../middlewares/authorize";

const jobdescriptionRouter: express.Router = express.Router();

const service = new JobDescriptionService(container.jobDescriptionRepository);

jobdescriptionRouter.get(
	"/",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const all = await service.getAll();
		res.json(all);
	},
);

jobdescriptionRouter.get(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: idError } = idSchema.validate(req.params.id);
		if (idError) {
			next(new BadRequestError(idError.message));
			return;
		}

		const jobdescription = await service.getById(req.params.id);
		if (jobdescription === null) {
			next(new NotFoundError("JobDescription not found"));
			return;
		}

		res.json(jobdescription);
	},
);

jobdescriptionRouter.post(
	"/",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: createJobDescriptionError } = CreateJobDescriptionSchema.validate(
			req.body,
		);
		if (createJobDescriptionError) {
			next(new BadRequestError(createJobDescriptionError.message));
			return;
		}

		const jobdescription = await service.create(req.body);
		res.status(201).json(jobdescription);
	},
);

jobdescriptionRouter.patch(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: idError } = idSchema.validate(req.params.id);
		if (idError) {
			next(new BadRequestError(idError.message));
			return;
		}

		const { error: updateJobDescriptionError } = UpdateJobDescriptionSchema.validate(
			req.body,
		);
		if (updateJobDescriptionError) {
			next(new BadRequestError(updateJobDescriptionError.message));
			return;
		}

		const jobdescription = await service.update(req.params.id, req.body);
		if (jobdescription === null) {
			next(new NotFoundError("JobDescription not found"));
			return;
		}
		res.json(jobdescription);
	},
);

jobdescriptionRouter.delete(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: idError } = idSchema.validate(req.params.id);
		if (idError) {
			next(new BadRequestError(idError.message));
			return;
		}

		const deleted = await service.delete(req.params.id);

		if (!deleted) {
			next(new NotFoundError("JobDescription not found"));
			return;
		}

		res.json({ message: "JobDescription deleted" });
	},
);

export default jobdescriptionRouter;

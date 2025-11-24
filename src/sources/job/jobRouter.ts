import express, { NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../customErrors";
import { UpdateJobSchema, CreateJobSchema } from "./jobSchemas";
import { idSchema } from "../../utils/idSchema";
import { container } from "../../db/diDbContainer";
import { JobService } from "./jobService";
import { authorize } from "../../middlewares/authorize";

const jobRouter: express.Router = express.Router();

const service = new JobService(container.jobRepository);

jobRouter.get(
	"/",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const all = await service.getAll();
		res.json(all);
	},
);

jobRouter.get(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: idError } = idSchema.validate(req.params.id);
		if (idError) {
			next(new BadRequestError(idError.message));
			return;
		}

		const job = await service.getById(req.params.id);
		if (job === null) {
			next(new NotFoundError("Job not found"));
			return;
		}

		res.json(job);
	},
);

jobRouter.post(
	"/",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: createJobError } = CreateJobSchema.validate(req.body);
		if (createJobError) {
			next(new BadRequestError(createJobError.message));
			return;
		}

		const job = await service.create(req.body);
		res.status(201).json(job);
	},
);

jobRouter.patch(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: idError } = idSchema.validate(req.params.id);
		if (idError) {
			next(new BadRequestError(idError.message));
			return;
		}

		const { error: updateJobError } = UpdateJobSchema.validate(req.body);
		if (updateJobError) {
			next(new BadRequestError(updateJobError.message));
			return;
		}

		const job = await service.update(req.params.id, req.body);
		if (job === null) {
			next(new NotFoundError("Job not found"));
			return;
		}

		res.json(job);
	},
);

jobRouter.delete(
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
			next(new NotFoundError("Job not found"));
			return;
		}

		res.json({ message: "Job deleted" });
	},
);

export default jobRouter;

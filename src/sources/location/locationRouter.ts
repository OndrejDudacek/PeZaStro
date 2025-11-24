import express, { NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../customErrors";
import { UpdateLocationSchema, CreateLocationSchema } from "./locationSchemas";
import { idSchema } from "../../utils/idSchema";
import { container } from "../../db/diDbContainer";
import { LocationService } from "./locationService";
import { authorize } from "../../middlewares/authorize";

const locationRouter: express.Router = express.Router();

const service = new LocationService(container.locationRepository);

locationRouter.get(
	"/",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const all = await service.getAll();
		res.json(all);
	},
);

locationRouter.get(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: idError } = idSchema.validate(req.params.id);
		if (idError) {
			next(new BadRequestError(idError.message));
			return;
		}

		const location = await service.getById(req.params.id);
		if (location === null) {
			next(new NotFoundError("Location not found"));
			return;
		}

		res.json(location);
	},
);

locationRouter.post(
	"/",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: createLocationError } = CreateLocationSchema.validate(req.body);
		if (createLocationError) {
			next(new BadRequestError(createLocationError.message));
			return;
		}

		const location = await service.create(req.body);
		res.status(201).json(location);
	},
);

locationRouter.patch(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: idError } = idSchema.validate(req.params.id);
		if (idError) {
			next(new BadRequestError(idError.message));
			return;
		}

		const { error: updateLocationError } = UpdateLocationSchema.validate(req.body);
		if (updateLocationError) {
			next(new BadRequestError(updateLocationError.message));
			return;
		}

		const location = await service.update(req.params.id, req.body);
		if (location === null) {
			next(new NotFoundError("Location not found"));
			return;
		}

		res.json(location);
	},
);

locationRouter.delete(
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
			next(new NotFoundError("Location not found"));
			return;
		}

		res.json({ message: "Location deleted" });
	},
);

export default locationRouter;

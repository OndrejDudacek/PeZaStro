import express, { NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../customErrors";
import { UpdateContractSchema, CreateContractSchema } from "./contractSchemas";
import { idSchema } from "../../utils/idSchema";
import { container } from "../../db/diDbContainer";
import { ContractService } from "./contractService";
import { authorize } from "../../middlewares/authorize";

const contractRouter: express.Router = express.Router();

const service = new ContractService(container.contractRepository);

contractRouter.get(
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

contractRouter.get(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { error: idError } = idSchema.validate(req.params.id);
			if (idError) {
				next(new BadRequestError(idError.message));
				return;
			}

			const contract = await service.getById(req.params.id);
			if (contract === null) {
				next(new NotFoundError("Contract not found"));
				return;
			}

			res.json(contract);
		} catch (error) {
			next(error);
		}
	},
);

contractRouter.post(
	"/",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { error: createContractError } = CreateContractSchema.validate(req.body);
			if (createContractError) {
				next(new BadRequestError(createContractError.message));
				return;
			}

			const contract = await service.create(req.body);
			res.status(201).json(contract);
		} catch (error) {
			next(error);
		}
	},
);

contractRouter.patch(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { error: idError } = idSchema.validate(req.params.id);
			if (idError) {
				next(new BadRequestError(idError.message));
				return;
			}

			const { error: updateContractError } = UpdateContractSchema.validate(req.body);
			if (updateContractError) {
				next(new BadRequestError(updateContractError.message));
				return;
			}

			const contract = await service.update(req.params.id, req.body);
			if (contract === null) {
				next(new NotFoundError("Contract not found"));
				return;
			}

			res.json(contract);
		} catch (error) {
			next(error);
		}
	},
);

contractRouter.delete(
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
				next(new NotFoundError("Contract not found"));
				return;
			}

			res.json({ message: "Contract deleted" });
		} catch (error) {
			next(error);
		}
	},
);

export default contractRouter;

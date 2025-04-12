import express from "express";
import Contract from "./contract";
import { BadRequestError, NotFoundError } from "../../utils/errors";
import { UpdateContractSchema, CreateContractSchema } from "./contractSchemas";
import findById from "../../middlewares/findById";
import { contracts } from "../../utils/db";

const contractRouter: express.Router = express.Router();

contractRouter.get("/", (req: express.Request, res: express.Response) => {
	res.json(contracts);
});

contractRouter.get(
	"/:id",
	(req: express.Request, res: express.Response, next: express.NextFunction) => {
		const contract = findById(contracts, req.params.id);
		if ("error" in contract) {
			next(new NotFoundError(contract.error));
			return;
		}
		res.json(contract);
	}
);

contractRouter.post(
	"/",
	(req: express.Request, res: express.Response, next: express.NextFunction) => {
		const { error } = CreateContractSchema.validate(req.body);
		if (error) {
			next(new BadRequestError(error.message));
			return;
		}

		const contract = new Contract(
			req.body.totalCost,
			req.body.dateOfSigning,
			req.body.locationId,
			req.body.note
		);
		res.json(contract);
	}
);

contractRouter.patch(
	"/:id",
	(req: express.Request, res: express.Response, next: express.NextFunction) => {
		const contract = findById(contracts, req.params.id);
		if ("error" in contract) {
			next(new NotFoundError(contract.error));
			return;
		}

		const { error } = UpdateContractSchema.validate(req.body);
		if (error) {
			next(new BadRequestError(error.message));
			return;
		}

		contract.update(req.body);
		res.json(contract);
	}
);

contractRouter.delete(
	"/:id",
	(req: express.Request, res: express.Response, next: express.NextFunction) => {
		const contract = findById(contracts, req.params.id);
		if ("error" in contract) {
			next(new NotFoundError(contract.error));
			return;
		}

		contract.delete();
		res.json({ message: "Contract deleted successfully" });
	}
);

export default contractRouter;

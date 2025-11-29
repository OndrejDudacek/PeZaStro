import express, { NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../customErrors";
import { UpdateCustomerSchema, CreateCustomerSchema } from "./customerSchemas";
import { idSchema } from "../../utils/idSchema";
import { container } from "../../db/diDbContainer";
import { CustomerService } from "./customerService";
import { authorize } from "../../middlewares/authorize";

const customerRouter: express.Router = express.Router();

const service = new CustomerService(container.customerRepository);

customerRouter.get(
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

customerRouter.get(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { error: idError } = idSchema.validate(req.params.id);
			if (idError) {
				next(new BadRequestError(idError.message));
				return;
			}

			const customer = await service.getById(req.params.id);
			if (customer === null) {
				next(new NotFoundError("Customer not found"));
				return;
			}

			res.json(customer);
		} catch (error) {
			next(error);
		}
	},
);

customerRouter.post(
	"/",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { error: createCustomerError } = CreateCustomerSchema.validate(req.body);
			if (createCustomerError) {
				next(new BadRequestError(createCustomerError.message));
				return;
			}

			const customer = await service.create(req.body);
			res.status(201).json(customer);
		} catch (error) {
			next(error);
		}
	},
);

customerRouter.patch(
	"/:id",
	authorize,
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		try {
			const { error: idError } = idSchema.validate(req.params.id);
			if (idError) {
				next(new BadRequestError(idError.message));
				return;
			}

			const { error: updateCustomerError } = UpdateCustomerSchema.validate(req.body);
			if (updateCustomerError) {
				next(new BadRequestError(updateCustomerError.message));
				return;
			}

			const customer = await service.update(req.params.id, req.body);
			if (customer === null) {
				next(new NotFoundError("Customer not found"));
				return;
			}

			res.json(customer);
		} catch (error) {
			next(error);
		}
	},
);

customerRouter.delete(
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
				next(new NotFoundError("Customer not found"));
				return;
			}

			res.json({ message: "Customer deleted" });
		} catch (error) {
			next(error);
		}
	},
);

export default customerRouter;

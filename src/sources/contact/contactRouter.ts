import express, { NextFunction } from "express";
import { BadRequestError, NotFoundError } from "../../customErrors";
import { UpdateContactSchema, CreateContactSchema } from "./contactSchemas";
import { idSchema } from "../../utils/idSchema";
import { container } from "../../db/diDbContainer";
import { ContactService } from "./contactService";

const contactRouter: express.Router = express.Router();

const service = new ContactService(container.contactRepository);

contactRouter.get(
	"/",
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const all = await service.getAll();
		res.json(all);
	},
);

contactRouter.get(
	"/:id",
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: idError } = idSchema.validate(req.params.id);
		if (idError) {
			next(new BadRequestError(idError.message));
			return;
		}

		const contact = await service.getById(req.params.id);
		if (contact === null) {
			next(new NotFoundError("Contact not found"));
			return;
		}

		res.json(contact);
	},
);

contactRouter.post(
	"/",
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: createContactError } = CreateContactSchema.validate(req.body);
		if (createContactError) {
			next(new BadRequestError(createContactError.message));
			return;
		}

		const contact = await service.create(req.body);
		res.status(201).json(contact);
	},
);

contactRouter.patch(
	"/:id",
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: idError } = idSchema.validate(req.params.id);
		if (idError) {
			next(new BadRequestError(idError.message));
			return;
		}

		const { error: updateContactError } = UpdateContactSchema.validate(req.body);
		if (updateContactError) {
			next(new BadRequestError(updateContactError.message));
			return;
		}

		const contact = await service.update(req.params.id, req.body);
		if (contact === null) {
			next(new NotFoundError("Contact not found"));
			return;
		}

		res.json(contact);
	},
);

contactRouter.delete(
	"/:id",
	async (req: express.Request, res: express.Response, next: NextFunction) => {
		const { error: idError } = idSchema.validate(req.params.id);
		if (idError) {
			next(new BadRequestError(idError.message));
			return;
		}

		const deleted = await service.delete(req.params.id);

		if (!deleted) {
			next(new NotFoundError("Contact not found"));
			return;
		}

		res.json({ message: "Contact deleted" });
	},
);

export default contactRouter;

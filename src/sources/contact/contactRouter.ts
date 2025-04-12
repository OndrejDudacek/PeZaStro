import express, { NextFunction } from "express";
import Contact from "./contact";
import { contacts } from "../../utils/db";
import { BadRequestError, NotFoundError } from "../../utils/errors";
import { UpdateContactSchema, CreateContactSchema } from "./contactSchemas";
import findById from "../../middlewares/findById";

const contactRouter: express.Router = express.Router();

contactRouter.get(
	"/",
	(req: express.Request, res: express.Response, next: NextFunction) => {
		res.json(contacts);
	}
);

contactRouter.get(
	"/:id",
	(req: express.Request, res: express.Response, next: NextFunction) => {
		const contact = findById(contacts, req.params.id);
		if ("error" in contact) {
			next(new NotFoundError(contact.error));
			return;
		}
		res.json(contact);
	}
);

contactRouter.post(
	"/",
	(req: express.Request, res: express.Response, next: NextFunction) => {
		const { error } = CreateContactSchema.validate(req.body);
		if (error) {
			next(new BadRequestError(error.message));
			return;
		}
		const contact = new Contact(
			req.body.name,
			req.body.customerId,
			req.body.phone,
			req.body.email
		);
		res.json(contact);
	}
);

contactRouter.patch(
	"/:id",
	(req: express.Request, res: express.Response, next: NextFunction) => {
		const contact = findById(contacts, req.params.id);
		if ("error" in contact) {
			next(new NotFoundError(contact.error));
			return;
		}

		const { error } = UpdateContactSchema.validate(req.body);
		if (error) {
			next(new BadRequestError(error.message));
			return;
		}

		contact.update(req.body);
		res.json(contact);
	}
);

contactRouter.delete(
	"/:id",
	(req: express.Request, res: express.Response, next: NextFunction) => {
		const contact = contacts.find((contact) => contact.id === req.params.id);
		if (!contact) {
			next(new NotFoundError("Contact not found"));
			return;
		}
		contact.delete();
		res.json({ message: "Contact deleted" });
	}
);

export default contactRouter;

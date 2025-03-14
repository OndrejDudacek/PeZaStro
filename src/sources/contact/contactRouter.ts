import express from "express";
import Contact from "./contact";
import { contacts } from "../../utils/db";
import { updateContactSchema, createContactSchema } from "./contactSchemas";
import findById from "../../middlewares/findById";

const contactRouter: express.Router = express.Router();

contactRouter.get("/", (req: express.Request, res: express.Response) => {
	res.json(contacts);
});

contactRouter.get("/:id", (req: express.Request, res: express.Response) => {
	const contact = findById(contacts, req.params.id);
	if ("error" in contact) {
		res.status(404).json({ message: contact.error });
		return;
	}
	res.json(contact);
});

contactRouter.post("/", (req: express.Request, res: express.Response) => {
	const { error } = createContactSchema.validate(req.body);
	if (error) {
		res.status(400).json({ message: error.message });
		return;
	}
	const contact = new Contact(
		req.body.name,
		req.body.customerId,
		req.body.phone,
		req.body.email
	);
	res.json(contact);
});

contactRouter.patch("/:id", (req: express.Request, res: express.Response) => {
	const { error } = updateContactSchema.validate(req.body);
	if (error) {
		res.status(400).json({ message: error.message });
		return;
	}
});

contactRouter.delete("/:id", (req: express.Request, res: express.Response) => {
	const contact = contacts.find((contact) => contact.id === req.params.id);
	if (!contact) {
		res.status(404).json({ message: "Contact not found" });
		return;
	}
	contact.delete();
	res.json({ message: "Contact deleted" });
});

export default contactRouter;

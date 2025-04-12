import Joi from "joi";
import { idSchema } from "../../utils/idSchema.js";

export const CreateContactSchema = Joi.object({
	name: Joi.string().min(3).max(50).required(),
	//customerId: idSchema.required(),
	customerId: Joi.string().required(),
	phone: Joi.number().optional(),
	email: Joi.string().email().optional(),
});

export const UpdateContactSchema = Joi.object({
	name: Joi.string().min(3).max(50).optional(),
	//customerId: idSchema.optional(),
	customerId: Joi.string().optional(),
	phone: Joi.number().optional(),
	email: Joi.string().email().optional(),
});

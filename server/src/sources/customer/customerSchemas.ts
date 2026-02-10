import Joi from "joi";
import { idSchema } from "../../utils/idSchema.js";

export const CreateCustomerSchema = Joi.object({
	name: Joi.string().min(3).max(50).required(),
	note: Joi.string().max(1500).allow(null).optional(),
});

export const UpdateCustomerSchema = Joi.object({
	name: Joi.string().min(3).max(50).optional(),
	note: Joi.string().max(1500).allow(null).optional(),
});

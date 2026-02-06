import Joi from "joi";
import { idSchema } from "../../utils/idSchema.js";

export const CreateLocationSchema = Joi.object({
	address: Joi.object({
		street: Joi.string().min(3).max(50).required(),
		houseNumber: Joi.number().required(),
		postalCode: Joi.number().min(10000).max(99999).required(),
		city: Joi.string().min(3).max(50).required(),
	}).required(),
	customerId: idSchema.required(),
	note: Joi.string().max(1500).optional(),
});

export const UpdateLocationSchema = Joi.object({
	address: Joi.object({
		street: Joi.string().min(3).max(50).optional(),
		houseNumber: Joi.number().optional(),
		postalCode: Joi.number().min(10000).max(99999).optional(),
		city: Joi.string().min(3).max(50).optional(),
	}).optional(),
	customerId: idSchema.optional(),
	note: Joi.string().max(1500).optional(),
});

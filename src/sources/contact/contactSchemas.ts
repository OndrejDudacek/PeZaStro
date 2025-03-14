import Joi from "joi";

export const createContactSchema = Joi.object({
	name: Joi.string().min(3).max(50).required(),
	customerId: Joi.string().required(),
	phone: Joi.number().min(9).max(11).optional(),
	email: Joi.string().email().optional(),
});

export const updateContactSchema = Joi.object({
	name: Joi.string().min(3).max(50).optional(),
	customerId: Joi.string().optional(),
	phone: Joi.number().min(9).max(11).optional(),
	email: Joi.string().email().optional(),
});

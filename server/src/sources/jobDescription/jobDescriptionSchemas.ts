import Joi from "joi";
import { idSchema } from "../../utils/idSchema.js";

export const CreateJobDescriptionSchema = Joi.object({
	name: Joi.string().min(3).max(50).required(),
	contractId: idSchema.required(),
	cost: Joi.number().min(0).required(),
	frequency: Joi.string().valid("month", "year").allow(null).optional(),
	period: Joi.number().min(1).allow(null).optional(),
});

export const UpdateJobDescriptionSchema = Joi.object({
	name: Joi.string().min(3).max(50).optional(),
	contractId: idSchema.optional(),
	cost: Joi.number().min(0).optional(),
	frequency: Joi.string().valid("month", "year").allow(null).optional(),
	period: Joi.number().min(1).allow(null).optional(),
});

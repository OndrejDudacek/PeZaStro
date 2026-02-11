import Joi from "joi";
import { idSchema } from "../../utils/idSchema.js";

export const CreateJobSchema = Joi.object({
	date: Joi.string().isoDate().required(),
	contractId: idSchema.required(),
	note: Joi.string().max(1500).required(),
});

export const UpdateJobSchema = Joi.object({
	date: Joi.string().isoDate().optional(),
	contractId: idSchema.optional(),
	note: Joi.string().max(1500).allow(null).optional(),
});

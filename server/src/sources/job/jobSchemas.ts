import Joi from "joi";
import { idSchema } from "../../utils/idSchema.js";

export const CreateJobSchema = Joi.object({
	date: Joi.string().isoDate().required(),
	note: Joi.string().max(1500).required(),
	contractId: idSchema.required(),
});

export const UpdateJobSchema = Joi.object({
	date: Joi.string().isoDate().optional(),
	note: Joi.string().max(1500).optional(),
	contractId: idSchema.optional(),
});

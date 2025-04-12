import Joi from "joi";
import { idSchema } from "../../utils/idSchema.js";

export const CreateContractSchema = Joi.object({
	totalCost: Joi.number().min(0).required(),
	dateOfSigning: Joi.string().isoDate().required(),
	//locationId: idSchema.required(),
	locationId: Joi.string().optional(),
	note: Joi.string().max(1500).optional(),
});

export const UpdateContractSchema = Joi.object({
	totalCost: Joi.number().min(0).optional(),
	dateOfSigning: Joi.string().isoDate().optional(),
	//locationId: idSchema.optional(),
	locationId: Joi.string().optional(),
	note: Joi.string().max(1500).optional(),
});

import Joi from "joi";

export const ValidateUserSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

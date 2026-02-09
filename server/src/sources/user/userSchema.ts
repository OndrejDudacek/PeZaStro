import Joi from "joi";

export const ValidateUserSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

export const CreateUserSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

export const UpdateUserSchema = Joi.object({
	username: Joi.string().optional(),
	password: Joi.string().optional(),
});

import express from "express";
import { idSchema } from "../utils/idSchema";

const findById = <T extends { id: string }>(
	array: T[],
	id: string
): T | { error: string } => {
	const { error } = idSchema.validate(id);
	if (error) {
		return { error: error.message };
	}
	const item = array.find((item) => item.id === id);
	if (!item) {
		return { error: "Item not found" };
	}
	return item;
};

export default findById;

import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import "express-async-errors";

import { container } from "./db/diDbContainer";
import errorHandler from "./middlewares/errorHandler";

const bootstrap = async () => {
	await container.init();

	const app: express.Express = express();
	const PORT = 4321;
	const apiPath = "/api/v1/";

	app.use(json());
	app.use(cors());
	app.use(express.json());

	const contactRouter = (await import("./sources/contact/contactRouter")).default;
	app.use(apiPath + "contact", contactRouter);

	const contractRouter = (await import("./sources/contract/contractRouter")).default;
	app.use(apiPath + "contract", contractRouter);

	const customerRouter = (await import("./sources/customer/customerRouter")).default;
	app.use(apiPath + "customer", customerRouter);

	const jobRouter = (await import("./sources/job/jobRouter")).default;
	app.use(apiPath + "job", jobRouter);

	const jobDescriptionRouter = (
		await import("./sources/jobDescription/jobDescriptionRouter")
	).default;
	app.use(apiPath + "jobDescription", jobDescriptionRouter);

	const locationRouter = (await import("./sources/location/locationRouter")).default;
	app.use(apiPath + "location", locationRouter);

	app.use(errorHandler);

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
};

bootstrap().catch((err) => {
	console.error("failed to start", err);
	process.exit(1);
});

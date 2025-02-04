import express, { json } from "express";
import cors from "cors";
import contactRouter from "./sources/contact/contactRouter";
import contractRouter from "./sources/contract/contractRouter";
import customerRouter from "./sources/customer/customerRouter";
import jobRouter from "./sources/job/jobRouter";
import jobDescriptionRouter from "./sources/jobDescription/jobDescriptionRouter";
import locationRouter from "./sources/location/locationRouter";

const app: express.Express = express();
const PORT = 4321;
const apiPath = "/api/v1/";

app.use(json());
app.use(cors());
app.use(express.json());

app.use(apiPath + "contact", contactRouter);
app.use(apiPath + "contract", contractRouter);
app.use(apiPath + "customer", customerRouter);
app.use(apiPath + "job", jobRouter);
app.use(apiPath + "jobDescription", jobDescriptionRouter);
app.use(apiPath + "location", locationRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

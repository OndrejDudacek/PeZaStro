import express from "express";
import JobDescription from "./jobDescription";
import { jobDescriptions } from "../../utils/inMemoryDB";

const jobDescriptionRouter: express.Router = express.Router();

export default jobDescriptionRouter;

import express from "express";
import JobDescription from "./jobDescription";
import { jobDescriptions } from "../../db/inMemoryDB";

const jobDescriptionRouter: express.Router = express.Router();

export default jobDescriptionRouter;

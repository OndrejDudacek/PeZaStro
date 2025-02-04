import express from "express";
import Job from "./job";
import { jobs } from "../../utils/db";

const jobRouter: express.Router = express.Router();

export default jobRouter;

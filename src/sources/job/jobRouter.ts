import express from "express";
import Job from "./job";
import { jobs } from "../../db/inMemoryDB";

const jobRouter: express.Router = express.Router();

export default jobRouter;

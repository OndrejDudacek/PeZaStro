import express from "express";
import Customer from "./customer";
import { customers } from "../../db/inMemoryDB";

const customerRouter: express.Router = express.Router();

export default customerRouter;

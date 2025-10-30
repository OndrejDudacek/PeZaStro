import express from "express";
import Customer from "./customer";
import { customers } from "../../utils/inMemoryDB";

const customerRouter: express.Router = express.Router();

export default customerRouter;

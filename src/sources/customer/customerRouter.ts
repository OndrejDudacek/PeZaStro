import express from "express";
import Customer from "./customer";
import { customers } from "../../utils/db";

const customerRouter: express.Router = express.Router();

export default customerRouter;

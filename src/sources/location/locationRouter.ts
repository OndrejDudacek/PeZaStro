import express from "express";
import Location from "./location";
import { locations } from "../../utils/db";

const locationRouter: express.Router = express.Router();

export default locationRouter;

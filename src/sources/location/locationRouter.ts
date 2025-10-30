import express from "express";
import Location from "./location";
import { locations } from "../../utils/inMemoryDB";

const locationRouter: express.Router = express.Router();

export default locationRouter;

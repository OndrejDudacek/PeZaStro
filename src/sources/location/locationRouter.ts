import express from "express";
import Location from "./location";
import { locations } from "../../db/inMemoryDB";

const locationRouter: express.Router = express.Router();

export default locationRouter;

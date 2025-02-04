import express from "express";
import Contact from "./contact";
import { contacts } from "../../utils/db";

const contactRouter: express.Router = express.Router();

export default contactRouter;

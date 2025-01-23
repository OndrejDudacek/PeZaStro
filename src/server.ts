import express from "express";
import cors from "cors";

const app: express.Express = express();
const PORT = 4321;
const apiPath = "/api/v1/";

app.use(cors());
app.use(express.json());

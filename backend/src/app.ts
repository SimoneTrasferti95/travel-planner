

import express from "express";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes";
import placeRoutes from "./routes/placeRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/trips", tripRoutes);
app.use("/", placeRoutes);

export default app;
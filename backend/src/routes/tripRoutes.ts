// importiamo le librerie necessarie e i controller per gestire le operazioni sui viaggi (trips)

import { Router } from "express";
import {
  getTrips,
  getTripById,
  createTrip,
  deleteTrip
} from "../controllers/tripControllers";

const router = Router();

router.get("/", getTrips);
router.get("/:id", getTripById);
router.post("/", createTrip);
router.delete("/:id", deleteTrip);

export default router;

import { Router } from "express";
import {
  getPlacesByTrip,
  createPlace,
  updatePlaceStatus,
  deletePlace
} from "../controllers/placeController";

const router = Router();

router.get("/trips/:tripId/places", getPlacesByTrip);
router.post("/trips/:tripId/places", createPlace);
router.patch("/places/:id/status", updatePlaceStatus);
router.delete("/places/:id", deletePlace);

export default router;
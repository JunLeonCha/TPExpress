import express from "express";
import { listArmors } from "../Controllers/armorController.js";

const router = express.Router();

router.get("/", listArmors);

export default router;

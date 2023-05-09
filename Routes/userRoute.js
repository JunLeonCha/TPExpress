import express from "express";
import UserController from "../Controllers/UserController.js";

const router = express.Router()

router.post("/add-user", UserController.addUsers)

export default router;
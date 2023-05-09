import express from "express";
import axios from "axios";
import { eldenClassController } from "../Controllers/eldenClassController.js";

const route = express.Router();

route.get("/", eldenClassController);

export default route;

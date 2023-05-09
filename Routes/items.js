import express from "express";
import axios from "axios";
import { itemsController } from "../Controllers/itemsController.js";

const route = express.Router();

route.get("/", itemsController);

export default route;

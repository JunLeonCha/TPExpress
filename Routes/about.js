import express from "express";

const route = express.Router();

route.get("/", (req, res) => {
  res.render("../Src/Render/Pages/aboutUs.ejs");
});

export default route;

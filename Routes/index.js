import express from "express";
const route = express.Router();
route.get("/", (req, res) => {
  res.render("../Src/Render/Layout.ejs", { content: "./Pages/home.ejs" });
});

export default route;

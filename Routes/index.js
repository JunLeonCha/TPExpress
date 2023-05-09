import express from "express";
const route = express.Router();
route.get("/", (req, res) => {
  res.render("../Src/Render/Layout.ejs", { content: "./Pages/home.ejs" });
});

route.get("/chat", (req, res) => {
  res.render("../Src/Render/pages/socket/socket.ejs");
});
export default route;

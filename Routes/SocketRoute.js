import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.render("../Src/Render/Pages/socket/socket.ejs" );
});

export default router;

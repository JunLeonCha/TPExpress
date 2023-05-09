import express from "express";
import path, { dirname } from "path";
import http from "http";
// import { Server } from "socket.io";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import socket from "./socket.js"
import index from "./Routes/index.js";
import about from "./Routes/about.js";
import items from "./Routes/items.js";
import eldenClass from "./Routes/eldenClassRoute.js";
import listArmor from "./Routes/armorRoute.js";
import SocketRoute from "./Routes/SocketRoute.js";
import UserRoute from "./Routes/userRoute.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = http.createServer(app);
const io = socket(server);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "Src")));

app
  .use("/", index)
  .use("/class", eldenClass)
  .use("/items", items)
  .use("/about", about)
  .use("/armor", listArmor)
  .use("/users", UserRoute)
  .use("/chat", SocketRoute)

server.listen(8080, () => {
  console.log("Server is running");
});

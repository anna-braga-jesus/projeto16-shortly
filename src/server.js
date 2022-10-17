import express from "express";
import cors from "cors";
import SignUpRouter from "./Routes/SignUpRouter.js";
import SignInRouter from "./Routes/SignInRouter.js";
import UrlsRouter from "./Routes/UrlsRouter.js";
import UsersRouter from "./Routes/UsersRouter.js";
import RankingRouter from "./Routes/RankingRouter.js";
import dotenv from "dotenv";
dotenv.config();

const server = express();
server.use([cors(), express.json()]);

server.use("/status", (req, res) => {
  res.sendStatus("Funciona");
});
server.use(SignUpRouter);

server.use(SignInRouter);

server.use(UrlsRouter);

server.use(UsersRouter);

server.use(RankingRouter);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

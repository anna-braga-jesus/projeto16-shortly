import express from 'express';
import cors from 'cors';
import SignUpRouter from './Routes/SignUpRouter.js';
import SignInRouter from'./Routes/SignInRouter.js';
import UrlsRouter from './Routes/UrlsRouter.js';
import dotenv from 'dotenv';
dotenv.config();

const server = express();
server.use([cors(), express.json()]);


// =========================================ROTAS===================================================
//POST/signup
server.use(SignUpRouter);

//POST/signin
server.use(SignInRouter);

//POST///urls/shorten
//server.use(UrlsRouter);

//GET/urls/:id
server.use(UrlsRouter);

//GET/urls/open/:shortUrl
//server.use(UrlsRouter);

//DELETE/urls/:id
//server.use(UrlsRouter);

//GET/users/me
//server.use(UrlsRouter);

//GET/ranking
//server.use(RankingRouter);

const PORT = process.env.PORT || 4000

server.listen(PORT, () => console.log("Listening on port 4000..."));
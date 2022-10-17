import express from "express";
import listUsers from "../Controllers/UsersController.js";
import {validateUsers} from '../Middlewares/UsersMiddleware.js';
import { validateToken } from "../Middlewares/validateToken.js";
import { sumViews } from "../Middlewares/UrlMiddleware.js";

const router = express.Router();

router.get("/users/me", validateToken, validateUsers, sumViews, listUsers);

export default router;

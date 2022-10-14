import express from "express";
import { listUsers } from "../Controllers/UsersController.js";
import { validateUsers } from "../Middlewares/UsersMiddleware.js";

const router = express.Router();

router.get("/users/me",validateUsers, listUsers);

export default router;

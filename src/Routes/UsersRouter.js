import express from "express";
import { listUsers } from "../Controllers/UsersController.js";

const router = express.Router();

router.get("/users/me", listUsers);

export default router;

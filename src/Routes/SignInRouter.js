import express from "express";
import { SignIn } from "../Controllers/SignInController.js";

const router = express.Router();

//POST/signin
router.post("/signin", SignIn);

export default router;
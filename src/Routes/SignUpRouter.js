import express from "express";
import { SignUp } from "../Controllers/SignUpController.js";

const router = express.Router();

//POST/signup
router.post("/signup", SignUp);

export default router;

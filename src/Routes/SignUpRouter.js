import express from "express";
import { SignUp } from "../Controllers/SignUpController.js";
import validateSignUp from "../Middlewares/SignUpMiddlewares.js";

const router = express.Router();

//POST/signup
router.post("/signup", validateSignUp, SignUp);

export default router;

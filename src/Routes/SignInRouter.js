import express from "express";
import { SignIn } from "../Controllers/SignInController.js";
import {searchAUser} from "../Middlewares/SignInMiddleware.js";
import {validationSchema} from "../Middlewares/SignInMiddleware.js";

const router = express.Router();

router.post("/signin",validationSchema, searchAUser, SignIn);

export default router;
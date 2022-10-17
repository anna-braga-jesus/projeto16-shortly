import express from "express";
import listRanking from "../Controllers/RankingController.js";
import { sumViews } from "../Middlewares/UrlMiddleware.js";

const router = express.Router();

router.get("/ranking",  listRanking)

export default router;
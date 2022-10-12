import express from "express";
import listRanking from "../Controllers/RankingController.js";

const router = express.Router();

router.get("/ranking",listRanking)

export default router;
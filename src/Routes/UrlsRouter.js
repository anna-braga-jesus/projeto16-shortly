import express from "express";
import {createUrlShorten, listUrlsById, shortUrl, deleteUrl } from "../Controllers/UrlController.js";

const router = express.Router();

//GET/urls/:id
router.post("/urls/shorten", createUrlShorten)
router.get("/urls/:id", listUrlsById);
router.get("/urls/open/:shortUrl", shortUrl)
router.delete("/urls/:id", deleteUrl)

export default router;

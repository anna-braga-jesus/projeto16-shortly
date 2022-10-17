import express from "express";
import {createUrlShorten, listUrlsById, shortUrl, deleteUrl } from "../Controllers/UrlController.js";
import { validateUrl, validateDelete } from "../Middlewares/UrlMiddleware.js";
import { validateToken } from "../Middlewares/validateToken.js";
const router = express.Router();

//GET/urls/:id
router.post("/urls/shorten",validateToken, validateUrl, createUrlShorten)
router.get("/urls/:id", listUrlsById);
router.get("/urls/open/:shortUrl", shortUrl)
router.delete("/urls/:id",validateToken,validateDelete, deleteUrl)

export default router;

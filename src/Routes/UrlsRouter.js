import express from "express";
import {createUrlShorten, listUrlsById, shortUrl, deleteUrl } from "../Controllers/UrlController.js";
import { validateUrl, validateDelete } from "../Middlewares/UrlMiddleware.js";

const router = express.Router();

//GET/urls/:id
router.post("/urls/shorten",validateUrl, createUrlShorten)
router.get("/urls/:id", listUrlsById);
router.get("/urls/open/:shortUrl", shortUrl)
router.delete("/urls/:id",validateDelete, deleteUrl)

export default router;

import express from "express";

import { getAllBooks, getBookById, createBook, searchBooks, deleteBook } from "../controllers/bookController.js";

const router = express.Router();
router.get("/search", searchBooks);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.delete("/:id", deleteBook);

export default router;
const express = require("express");
const router = express.Router();
const Book = require("../models/Book");


// ✅ GET ALL + SEARCH + PAGINATION
router.get("/", async(req, res) => {
    try {
        const { author, genre, page = 1, limit = 5 } = req.query;

        let filter = {};
        if (author) filter.author = author;
        if (genre) filter.genre = genre;

        const skip = (page - 1) * limit;

        const books = await Book.find(filter)
            .skip(skip)
            .limit(limit);

        res.status(200).json(books);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// ✅ GET BY ID
router.get("/:id", async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ message: "Invalid ID" });
    }
});


// ✅ CREATE BOOK
router.post("/", async(req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// ✅ UPDATE BOOK
router.put("/:id", async(req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// ✅ DELETE BOOK
router.delete("/:id", async(req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
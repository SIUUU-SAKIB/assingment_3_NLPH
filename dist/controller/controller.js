"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrowModel_1 = require("../models/borrowModel");
const router = express_1.default.Router();
exports.router = router;
// POST NEW BOOKS
router.post(`/books`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            const addBook = yield book_model_1.bookSchema.create(req.body);
            res.status(201).json({
                status: true,
                message: "Book created successfully",
                data: addBook
            });
        }
    }
    catch (err) {
        res.status(400).json({
            err
        });
    }
}));
// GET ALL BOOKS WITH OTEHR FUNCTIONALITIES
router.get(`/books`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;
        const books = yield book_model_1.bookSchema.find(filter ? { genre: filter } : [])
            .sort({ [sortBy]: sort === "desc" ? -1 : 1 })
            .limit(Number(limit));
        res.status(200).json({ success: true, data: books });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Could not get the books" });
    }
}));
// GET BOOKS BY ID
router.get(`/books/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookById = yield book_model_1.bookSchema.findById(req.params.id);
        if (!bookById) {
            return res.status(404).json({ status: false, message: "Book not found" });
        }
        else {
            res.status(200).json({
                status: true,
                message: `Successfully got the book`,
                bookById
            });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Could not get the books" });
    }
}));
// UPDATE BOOKS 
router.patch('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const updates = req.body;
    try {
        const updatedBook = yield book_model_1.bookSchema.findByIdAndUpdate(bookId, {
            $set: updates
        }, { new: true });
        if (!updatedBook) {
            res.status(404).json({
                message: "Book not found"
            });
        }
        else {
            res.status(200).json({
                status: true,
                message: "Successfully updated the book",
                updatedBook
            });
        }
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: "Could not update the book",
        });
    }
}));
// DELETE BOOK
router.delete(`/books/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_model_1.bookSchema.findByIdAndDelete(req.params.id, { new: true });
        res.status(200).json({
            status: true,
            message: "Successfully deleted the book",
        });
    }
    catch (error) {
        res.status(500).json({
            staus: false,
            message: "Failed to delete the book"
        });
    }
}));
// BORROW A BOOK
router.post(`/borrow`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const requestedBook = yield book_model_1.bookSchema.findById(book);
        if (!requestedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        if ((requestedBook === null || requestedBook === void 0 ? void 0 : requestedBook.copies) < quantity) {
            return res.status(400).json({ message: "Not enough copies available" });
        }
        // update the boook
        const newBorrow = yield borrowModel_1.BorrowSchema.create({
            book, quantity, dueDate
        });
        res.status(201).json({
            status: true,
            message: "Successfully borrowed the book",
            data: newBorrow
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to borrow the book"
        });
    }
}));
// AGGREGATE
router.get(`/borrow`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sumary = yield borrowModel_1.BorrowSchema.aggregate([
            {
                $group: {
                    _id: "$borrow",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            { $unwind: "$borrow" },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$books.title",
                        isbn: "$books.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.json({
            success: true,
            message: "Borrowed books sumary successfully",
            data: sumary
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Failed to get borrow summary",
            error: err
        });
    }
}));
router.get(`/`, (req, res) => {
    res.send(`ASSINGMENT THREE PROGRAMMING HERO`);
});

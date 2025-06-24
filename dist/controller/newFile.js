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
Object.defineProperty(exports, "__esModule", { value: true });
const book_model_1 = require("../models/book.model");
const borrowModel_1 = require("../models/borrowModel");
const controller_1 = require("./controller");
// BORROW A BOOK
controller_1.router.post(`/borrow`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            newBorrow
        });
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to borrow the book"
        });
    }
}));

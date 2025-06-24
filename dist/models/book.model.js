"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const mongoose_1 = require("mongoose");
const book_interface_1 = require("../interfaces/book_interface");
exports.bookSchema = (0, mongoose_1.model)("Book", new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        enum: Object.values(book_interface_1.Genre),
        required: true,
        trim: true
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    copies: {
        type: Number,
        required: [true, "Copies must be a positive number"],
        min: [0, "Copies must be a positive number"]
    },
    available: { type: Boolean, required: true, default: true }
}, {
    versionKey: false,
    timestamps: true
}));

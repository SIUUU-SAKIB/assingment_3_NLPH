"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BorrowSchema = (0, mongoose_1.model)("Borrow", new mongoose_1.Schema({
    book: { type: String, required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, default: Date.now() }
}, {
    timestamps: true
}));

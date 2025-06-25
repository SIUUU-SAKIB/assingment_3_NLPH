"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowModel = void 0;
// models/Borrow.ts
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: { type: String, required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
borrowSchema.pre("aggregate", function (next) {
    console.log("borrow triggered");
    next();
});
borrowSchema.post("aggregate", function (res) {
    console.log("return documents", res.length);
});
exports.BorrowModel = (0, mongoose_1.model)("Borrow", borrowSchema);

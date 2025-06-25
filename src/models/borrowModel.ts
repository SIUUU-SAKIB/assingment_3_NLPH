// models/Borrow.ts
import { Schema, model } from "mongoose";
import { IBorrow } from "../interfaces/borrow_interface";

const borrowSchema = new Schema<IBorrow>(
    {
        book: { type: String, required: true },
        quantity: { type: Number, required: true },
        dueDate: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);


borrowSchema.pre("aggregate", function (next) {
    console.log("borrow triggered");
    next();
});


borrowSchema.post("aggregate", function (res) {
    console.log("return documents", res.length);
});

export const BorrowModel = model("Borrow", borrowSchema);

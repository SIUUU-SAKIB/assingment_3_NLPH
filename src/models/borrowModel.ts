import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interfaces/borrow_interface";

export const BorrowSchema = model("Borrow", new Schema<IBorrow>({
    book: { type: String,  required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, default: Date.now() }
},
    {
        timestamps: true
    }))
    
import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interfaces/borrow_interface";

export const BorrowSchema = model("Borrow", new Schema<IBorrow>({
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, default: Date.now() }
},
    {
        timestamps: true
    }))
    
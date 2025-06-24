import { model, Schema } from "mongoose";
import { Genre, IBook } from "../interfaces/book_interface";

export const bookSchema = model("Book", new Schema<IBook>({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
        type: String,
        enum: Object.values(Genre),
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
}))
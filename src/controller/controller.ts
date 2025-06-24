import express, { Application, Request, Response } from "express"
import { model, Mongoose, Schema } from "mongoose"
import { bookSchema } from "../models/book.model"
import { IBook } from "../interfaces/book_interface"
import { IBorrow } from "../interfaces/borrow_interface"
import Borrow, { BorrowSchema } from "../models/borrowModel"
const router = express.Router()


// POST NEW BOOKS
router.post(`/books`, async (req: Request, res: Response) => {
    try {
        if (req.body) {
            const addBook = await bookSchema.create(req.body)

            res.status(201).json({
                status: true,
                message: "Book created successfully",
                data: addBook
            })
        }
    } catch (err: any) {
        res.status(400).json({
            err
        })
    }
})

// GET ALL BOOKS WITH OTEHR FUNCTIONALITIES
router.get(`/books`, async (req: Request, res: Response) => {

    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;

        const books = await bookSchema.find(filter ? { genre: filter } : [])
            .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
            .limit(Number(limit));

        res.status(200).json({ success: true, data: books });
    } catch (error) {
        res.status(500).json({ success: false, message: "Could not get the books" });
    }
})
// GET BOOKS BY ID
router.get(`/books/:id`, async (req: Request, res: Response) => {
    try {
        const bookById = await bookSchema.findById(req.params.id)
        if (!bookById) {
            return res.status(404).json({ status: false, message: "Book not found" });
        } else {
            res.status(200).json({
                status: true,
                message: `Successfully got the book`,
                bookById
            })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "Could not get the books" });
    }
})
// UPDATE BOOKS 
router.patch('/books/:bookId', async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const updates = req.body;
    try {
        const updatedBook = await bookSchema.findByIdAndUpdate(bookId, {
            $set: updates
        }, { new: true })

        if (!updatedBook) {
            res.status(404).json({
                message: "Book not found"
            })
        } else {

            res.status(200).json({
                status: true,
                message: "Successfully updated the book",
                updatedBook
            })

        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Could not update the book",

        })
    }
})

// DELETE BOOK
router.delete(`/books/:id`, async (req: Request, res: Response) => {
    try {
        await bookSchema.findByIdAndDelete(req.params.id, { new: true })

        res.status(200).json({
            status: true,
            message: "Successfully deleted the book",
        })
    } catch (error) {
        res.status(500).json({
            staus: false,
            message: "Failed to delete the book"
        })
    }
})

// BORROW A BOOK
router.post(`/borrow`, async (req: Request, res: Response) => {
    try {
        const { book, quantity, dueDate }: IBorrow = req.body;
        const requestedBook = await bookSchema.findById(book)
        if (!requestedBook) {
            return res.status(404).json({ message: "Book not found" })
        }
        if (requestedBook?.copies < quantity) {
            return res.status(400).json({ message: "Not enough copies available" });
        }

        // update the boook
        const newBorrow = await BorrowSchema.create({
            book, quantity, dueDate
        })
        res.status(201).json({
            status: true,
            message: "Successfully borrowed the book",
            data: newBorrow
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Failed to borrow the book"
        })
    }
})

// AGGREGATE
router.get(`/borrow`, async (req: Request, res: Response) => {
    try {
        const sumary = await BorrowSchema.aggregate([
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
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Failed to get borrow summary",
            error: err
        });
    }
})

router.get(`/`, (req, res) => {
    res.send(`ASSINGMENT THREE PROGRAMMING HERO`)
})

export { router }
import schema from "../utils/validate.js";

let books = [
    { id: 1, title: "Clean Code", author: "Robert Martin", price: 30 },
    { id: 2, title: "JavaScript Basics", author: "John Doe", price: 20 }
];

export const getAllBooks = (req, res) => {
    res.status(200).json(books);
};

export const getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);

};

export const searchBooks = (req, res) => {
    res.status(200).send("you are on the search page")
}

export const deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        res.status(404).json({ message: "Book Not Found" })
    }

    books.splice(index, 1);

    res.status(200).json({ message: "Book deleted successfully" })
}

export const createBook = (req, res) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title: value.title,
        author: value.author,
        price: value.price
    };

    books.push(newBook);
    res.status(201).json(newBook);
};
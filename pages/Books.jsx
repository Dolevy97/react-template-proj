const { useState, useEffect } = React;

import { BookIndex } from "../cmps/BookIndex.jsx";
import { bookService } from "../services/book.service.js";

export function Books() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        bookService.query()
            .then(books => {
                setBooks(books)
            })
    }, [])


    if (!books.length) return <h2>Loading...</h2>
    return (
        <BookIndex books={books} />
    )
}


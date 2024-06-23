const { useState, useEffect } = React;
import { bookService } from "../services/book.service.js";


export function Books() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        bookService.query()
            .then(books => {
                console.log(books)
                setBooks(books)
            })
    }, [])

    return (
        <h3>books</h3>
    )
}
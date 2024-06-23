const { useState, useEffect } = React;

import { BookDetails } from "../cmps/BookDetails.jsx";
import { BookList } from "../cmps/Booklist.jsx";
import { bookService } from "../services/book.service.js";

export function Books() {
    const [books, setBooks] = useState([])
    const [selectedBookId, setSelectedBookId] = useState(null)

    useEffect(() => {
        bookService.query()
            .then(books => {
                setBooks(books)
            })
            .catch(err => console.log('Found error! -> ', err))
    }, [])

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books.length) return <h2>Loading...</h2>
    
    return (
        <section className="book-index">
            {!selectedBookId &&
                < BookList
                    books={books}
                    onSelectBookId={onSelectBookId}
                />
            }
            {selectedBookId && <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />}
        </section>
    )
}


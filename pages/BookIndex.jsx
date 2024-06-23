const { useState, useEffect } = React;

import { BookDetails } from "../cmps/BookDetails.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/Booklist.jsx";
import { bookService } from "../services/book.service.js";

export function Books() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('Found error! -> ', err))
    }

    useEffect(() => loadBooks(), [])

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!books) return <h2>Loading..</h2>

    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    {!books.length && <h2>No books found</h2>}
                    < BookList
                        books={books}
                        onSelectBookId={onSelectBookId}
                    />
                </React.Fragment>
            }
            {selectedBookId && <BookDetails onBack={() => setSelectedBookId(null)} bookId={selectedBookId} />}
        </section>
    )
}


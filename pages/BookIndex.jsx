const { useState, useEffect } = React;

import { BookDetails } from "../cmps/BookDetails.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/Booklist.jsx";
import { NewBook } from "../cmps/NewBook.jsx";
import { bookService } from "../services/book.service.js";

export function Books() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [isAddingBook, setIsAddingBook] = useState(false)

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

    function onAddBook() {
        setIsAddingBook(prevIsAddingBook => !prevIsAddingBook)
    }

    function onCloseModal() {
        setIsAddingBook(false)
    }

    if (!books) return <h2>Loading..</h2>

    return (
        <section className="book-index">
            <button className="btn-add" onClick={onAddBook}>Add Book</button>
            {isAddingBook && <NewBook onCloseModal={onCloseModal} />}
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


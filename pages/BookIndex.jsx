const { Link } = ReactRouterDOM
const { useState, useEffect } = React;

import { BookFilter } from "../cmps/BookFilter.jsx";
import { BookList } from "../cmps/Booklist.jsx";
import { bookService } from "../services/book.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { BookAdd } from "./BookAdd.jsx";

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('Found error! -> ', err))
    }


    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
                showSuccessMsg('Book deleted successfully!')
            })
            .catch(err => console.log(err))
    }


    if (!books) return <h2>Loading..</h2>

    return (
        <section className="book-index">
            <BookAdd />
            <Link to="/book/edit"><button className="btn-add">Add Book</button></Link>
            <React.Fragment>
                <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!books.length && <h2>No books found</h2>}
                < BookList
                    books={books}
                    onRemoveBook={onRemoveBook}
                />
            </React.Fragment>
        </section>
    )
}


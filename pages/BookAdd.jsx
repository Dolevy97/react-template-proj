
const { useNavigate } = ReactRouterDOM
const { useEffect, useState } = React

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { googleBookService } from "../services/google.book.service.js"



export function BookAdd() {
    const [books, setBooks] = useState()
    const [tempBooks, setTempBooks] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        bookService.query()
            .then(setBooks)

        googleBookService.query()
            .then(books => {
                setTempBooks(books)
            })
    }, [])

    function getBookById(bookId) {
        return tempBooks.find(book => book.id === bookId)
    }

    function addGoogleBook(ev, bookId) {
        ev.preventDefault()
        const book = getBookById(bookId)
        let newBook = bookService.getEmptyBook()
        newBook = { ...newBook, id: book.id, title: book.title, listPrice: { ...newBook.listPrice, amount: book.price } }
        const findBook = books.find(book => book.id === bookId)
        if (findBook) {
            showErrorMsg('Book already exists!')
            return
        }
        bookService.addGoogleItem(newBook)
            .then(() => {
                navigate('/book')
                showSuccessMsg('Book saved successfully!')
            })
            .catch(err => console.log('err:', err))
    }

    if (!tempBooks) return <h4>Loading...</h4>
    return (
        <section className="google-books">
            <form onSubmit={addGoogleBook}>
                <label htmlFor="title"></label>
                <input type="text" placeholder="Search books" id="title" name="title" />
                <button>Submit</button>
            </form>

            <section className="books-list">
                {tempBooks.map(book => <div className="book-item" key={book.id}>
                    <h3>{book.title}</h3>
                    <button onClick={() => addGoogleBook(event, `${book.id}`)} className="btn-google-add">+</button></div>)}
            </section>
        </section>
    )
}
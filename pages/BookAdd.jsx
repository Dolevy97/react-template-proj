
const { useNavigate } = ReactRouterDOM
const { useEffect, useState } = React

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"



export function BookAdd() {
    const [books, setBooks] = useState()
    const tempBooks = [
        { id: 'D12C4', title: 'test 1', price: 20 },
        { id: 'G6F42', title: 'test 2', price: 30 },
        { id: 'H42G4', title: 'test 3', price: 40 }
    ]
    const navigate = useNavigate()

    useEffect(() => {
        bookService.query()
            .then(setBooks)
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
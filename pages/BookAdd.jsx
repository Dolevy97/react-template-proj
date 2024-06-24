
const { useNavigate } = ReactRouterDOM
const { useEffect, useState } = React

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { googleBookService } from "../services/google.book.service.js"



export function BookAdd() {
    const [books, setBooks] = useState()
    const [tempBooks, setTempBooks] = useState()
    const [filter, setFilter] = useState({ title: '' })

    const navigate = useNavigate()


    useEffect(() => {
        loadBooks()
    }, [filter])

    useEffect(() => {
        bookService.query()
            .then(setBooks)
            .catch(err => console.log('Found error! -> ', err))

        loadBooks()
    }, [])

    function loadBooks() {
        googleBookService.query(filter)
            .then(books => {
                setTempBooks(books)
            })
            .catch(err => console.log('Found error! -> ', err))
    }

    function getBookById(bookId) {
        return tempBooks.find(book => book.id === bookId)
    }

    function addGoogleBook(ev, bookId) {
        ev.preventDefault()
        const book = getBookById(bookId)
        let newBook = bookService.getEmptyBook()
        newBook = { ...newBook, id: book.id, title: book.title, listPrice: { ...newBook.listPrice, amount: book.price } }
        const findBook = books.find(book => book.id === bookId)
        if (findBook) return showErrorMsg('Book already exists!')
        bookService.addGoogleItem(newBook)
            .then(() => {
                navigate('/book')
                showSuccessMsg('Book saved successfully!')
            })
            .catch(err => console.log('err:', err))
    }

    useEffect(() => {
        setFilter(filter)
    }, [filter])

    function handleTxtChange({ target }) {
        const { value } = target
        setFilter(prevFilter => ({ ...prevFilter, title: value }))
    }

    const { title } = filter

    if (!tempBooks) return <h4>Loading...</h4>
    return (
        <section className="google-books">
            <form onSubmit={addGoogleBook}>
                <label htmlFor="title"></label>
                <input value={title} onChange={handleTxtChange} type="text" placeholder="Search books" id="title" name="title" />
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
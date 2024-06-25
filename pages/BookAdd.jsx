
const { useNavigate } = ReactRouterDOM
const { useEffect, useState } = React

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { googleBookService } from "../services/google.book.service.js"



export function BookAdd() {
    const [books, setBooks] = useState()
    const [googleBooks, setGoogleBooks] = useState()
    const [filter, setFilter] = useState({ title: '' })

    const navigate = useNavigate()


    useEffect(() => {
        loadBooks()
        setFilter(filter)
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
                setGoogleBooks(books)
            })
            .catch(err => console.log('Found error! -> ', err))
    }

    function getBookById(bookId) {
        return googleBooks.find(book => book.id === bookId)
    }

    function addGoogleBook(ev, bookId) {
        ev.preventDefault()
        const book = getBookById(bookId)
        let newBook = {
            ...book, listPrice: {
                amount: 60, currencyCode: 'NIS', isOnSale: Math.random() > 0.7
            }
        }
        const findBook = books.find(book => book.id === bookId)
        if (findBook) return showErrorMsg('Book already exists!')
        bookService.addGoogleItem(newBook)
            .then(() => {
                navigate('/book')
                showSuccessMsg('Book saved successfully!')
            })
            .catch(err => console.log('err:', err))
    }

    // function handleTxtChange({ target }) {
    //     const { value } = target
    //     setFilter(prevFilter => ({ ...prevFilter, title: value }))
    // }

    function onFilter(ev) {
        ev.preventDefault()
        const value = ev.target[0].value
        setFilter({ title: value })
    }

    const { title } = filter

    return (
        <section className="google-books">
            <form onSubmit={() => onFilter(event)}>
                <label htmlFor="title"></label>
                {/* <input value={title} onChange={handleTxtChange} type="text" placeholder="Search books" id="title" name="title" /> */}
                <input type="text" placeholder="Search books" id="title" name="title" />
                <button>Submit</button>
            </form>

            <section className="books-list">
                {googleBooks && googleBooks.map(book => <div onClick={() => addGoogleBook(event, `${book.id}`)} className="book-item" key={book.id}>
                    {book.thumbnail && <img className="book-cover-thumbnail" src={book.thumbnail} alt="Book thumbnail" />}
                    <h3>{book.title}</h3>
                    <button className="btn-google-add">+</button></div>)}
            </section>
        </section>
    )
}
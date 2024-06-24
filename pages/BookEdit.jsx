
const { useNavigate, useParams } = ReactRouterDOM

const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"



export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const { bookId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => {
                setBookToEdit(book)
                setBookToEdit(prevBook => ({ ...prevBook, price: book.listPrice.amount }))
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                showSuccessMsg('Book saved successfully!')
                navigate('/book')
            })
            .catch(err => console.log('err!', err))
    }

    const { title, price } = bookToEdit

    return (
        <section className="book-edit-container">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form className="book-edit-form" onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} type="text" id="title" name="title" />

                <label htmlFor="price">Price</label>
                <input value={price} onChange={handleChange} type="number" id="price" name="price" />

                <button>Save</button>
            </form>
        </section>
    )
}
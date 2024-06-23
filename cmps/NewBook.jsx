import { bookService } from "../services/book.service.js"


export function NewBook({ onCloseModal }) {

    function onAddBook(ev) {
        ev.preventDefault()
        // Add book logic

        // onCloseModal()
    }

    return (
        <section>
            <div className="backdrop"></div>
            <form className="add-book-form" onSubmit={onAddBook}>
                <button type="button" onClick={onCloseModal}>X</button>
                <input name="title" type="text" placeholder="Enter a title" />
                <input name="price" type="number" placeholder="Enter a price" />
                <button>Submit</button>
            </form>
        </section>
    )
}
const { Link, NavLink, useNavigate } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook }) {
    const navigate = useNavigate()


    function moveToBook(bookId) {
        navigate(`/book/${bookId}`)
    }

    return (
        <section className="books-container">
            {books.map(book =>
                <div key={book.id}>
                    <BookPreview book={book} moveToBook={() => moveToBook(book.id)} />
                    <section className="btns">
                        <button><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                        <button onClick={() => onRemoveBook(book.id)}>Remove</button>
                    </section>
                </div>

            )
            }
        </section >
    )
}
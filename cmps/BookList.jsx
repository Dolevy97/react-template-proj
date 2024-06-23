import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onSelectBookId }) {

    return (
        <section className="books-container">
            {books.map(book =>
                <div onClick={() => onSelectBookId(book.id)} key={book.id}>
                    <BookPreview book={book} />
                    <section className="btns">
                    </section>
                </div>
            )
            }
        </section >
    )
}
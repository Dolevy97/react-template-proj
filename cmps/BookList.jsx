import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books }) {

    return (
        <section className="books-container">
            {books.map(book =>
                <div key={book.id}>
                    <BookPreview book={book} />
                </div>
            )}
        </section>
    )
}
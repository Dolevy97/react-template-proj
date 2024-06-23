export function BookIndex({ books }) {
    return (
        <section className="books-container">
            {books.map(book => <div className="book-container" key={book.id}>
                <p>{book.title}</p>
                <img className="book-thumbnail" src={book.thumbnail}></img>
            </div>)}
        </section>
    )
}
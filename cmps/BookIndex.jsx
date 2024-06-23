export function BookIndex({ books }) {
    return (
        <section className="books-container">
            <h2>books</h2>
            <ul>
                {books.map(book => <li key={book.id}>
                    {book.title}
                </li>)}
            </ul>
        </section>
    )
}
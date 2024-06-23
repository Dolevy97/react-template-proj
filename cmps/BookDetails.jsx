import { bookService } from "../services/book.service.js"

bookService

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => {
                setBook(book)
                console.log(book)
            })

    }, [])

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <button className="btn-back" onClick={onBack}>{`<- Back`}</button>
            <img src={book.thumbnail} alt="" />
            <h2>Book Title: {book.title}</h2>
            <h3>Book Summary: {book.description}</h3>
        </section>
    )
}
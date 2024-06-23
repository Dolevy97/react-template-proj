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


    function getReadingLength() {
        var readingLength
        if (book.pageCount > 500) readingLength = 'Serious Reading'
        else if (book.pageCount > 200) readingLength = 'Decent Reading'
        else readingLength = 'Light Reading'
        return readingLength
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <button className="btn-back" onClick={onBack}>{`<- Back`}</button>
            <img src={book.thumbnail} alt="" />
            {book.listPrice.isOnSale && <img className="sale" src="./assets/img/saletag.png" alt="" />}
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <h3>By {`${book.authors.join(' ')}`}</h3>
            <h3>{getReadingLength()} ({book.pageCount} pages)</h3>
        </section>
    )
}
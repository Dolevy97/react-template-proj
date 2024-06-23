import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"
import { LongTxt } from "./LongTxt.jsx"

bookService

const { useEffect, useState } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => {
                setBook(book)
            })

    }, [])


    function getReadingLength() {
        var readingLength
        if (book.pageCount > 500) readingLength = 'Serious Reading'
        else if (book.pageCount > 200) readingLength = 'Decent Reading'
        else readingLength = 'Light Reading'
        return readingLength
    }

    function getPublishedDate() {
        const currYear = new Date().getFullYear()
        const diff = currYear - book.publishedDate
        if (diff > 10) return 'Vintage'
        else return 'New'
    }

    function getPriceClass() {
        if (book.listPrice.amount > 150) return 'red-text'
        else if (book.listPrice.amount < 150) return 'green-text'
        else return ''
    }

    function filterByWord({ target }) {
        const filter = target.innerText
        console.log(filter)
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <button className="btn-back" onClick={onBack}>{`<- Back`}</button>
            <img src={book.thumbnail} alt="" />
            {book.listPrice.isOnSale && <img className="sale" src="./assets/img/saletag.png" alt="" />}
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <h4>-By {`${book.authors.join(' ')}`}</h4>
            <h3>{getReadingLength()} ({book.pageCount} pages), {getPublishedDate()} ({book.publishedDate}) </h3>

            <LongTxt txt={book.description} />

            <h3>Genres: {book.categories.map((genre, idx) => {
                return <React.Fragment key={utilService.makeId()}>
                    {idx > 0 && ' '}
                    <span onClick={filterByWord} className='genre'>{genre}</span>
                </React.Fragment>
            })}</h3>
            <h2 className={getPriceClass()}>{book.listPrice.amount} {book.listPrice.currencyCode}</h2>
            <button>Buy Now!</button>
        </section>
    )
}
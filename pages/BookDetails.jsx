const { useParams, Link } = ReactRouterDOM
import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"

bookService

const { useEffect, useState } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const { bookId } = useParams()

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
            <Link to="/book"><button className="btn-back">Back</button></Link>
            <img src={book.thumbnail} alt="" />
            {book.listPrice.isOnSale && <img className="sale" src="./assets/img/saletag.png" alt="" />}
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <h4>-By {`${book.authors.join(' ')}`}</h4>
            <LongTxt txt={book.description} />
            <h3>{getReadingLength()} ({book.pageCount} pages), {getPublishedDate()} ({book.publishedDate}) </h3>

            <h3>Genres: {book.categories.map((genre, idx) => {
                return <React.Fragment key={idx}>
                    {idx > 0 && ' '}
                    <span onClick={filterByWord} className='genre'>{genre}</span>
                </React.Fragment>
            })}</h3>
            <h2 className={getPriceClass()}>{book.listPrice.amount} {book.listPrice.currencyCode}</h2>
            <button>Buy Now!</button>
        </section>
    )
}
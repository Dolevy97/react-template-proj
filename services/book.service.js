import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gNextId = 1

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getNextBookId,
    setFilterBy,
    getDefaultFilter,
    getEmptyBook,
    addReview,
    getEmptyReview,
    addGoogleItem
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount > filterBy.price)
            }

            if (filterBy.year) {
                const currYear = new Date().getFullYear()
                if (filterBy.year === 'vintage') books = books.filter(book => book.publishedDate < currYear - 10)
                if (filterBy.year === 'new') books = books.filter(book => book.publishedDate > currYear - 10)
            }

            if (filterBy.bookLength) {
                books = books.filter(book => book.pageCount > filterBy.bookLength)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}
function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) filterBy.txt = filterBy.txt
    if (filterBy.price !== undefined) filterBy.price = filterBy.price
    if (filterBy.year !== undefined) filterBy.year = filterBy.year
    if (filterBy.bookLength !== undefined) filterBy.bookLength = filterBy.bookLength
    return filterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}

function getDefaultFilter() {
    return { title: '', price: '', year: '', bookLength: '0' }
}

function getEmptyBook(title = '', amount = 0, thumbnail = `http://coding-academy.org/books-photos/${gNextId}.jpg`) {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    return {
        title,
        subtitle: utilService.makeLorem(4),
        authors: [
            utilService.makeLorem(1)
        ],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)], ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail,
        language: "en",
        listPrice: {
            amount,
            currencyCode: "NIS",
            isOnSale: Math.random() > 0.7
        },
        reviews: [
            {
                id: utilService.makeId(),
                fullName: utilService.makeLorem(1),
                rating: utilService.getRandomIntInclusive(1, 5),
                readAt: '06/24/2024'
            }
        ]
    }
}

function addReview(bookId, review) {
    review.id = utilService.makeId()
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book.reviews.push(review)
            return storageService.put(BOOK_KEY, book)
        })
}

function getEmptyReview() {
    return { fullName: '', rating: '', readAt: '' }
}

function addGoogleItem(book) {
    return storageService.postGoogle(BOOK_KEY, book)
}

// PRIVATE FUNCTIONS

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 20; i++) {
            const book = _createBook()
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    return {
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [
            utilService.makeLorem(1)
        ],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)], ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `http://coding-academy.org/books-photos/${gNextId++}.jpg`,
        language: "en",
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        },
        reviews: [
            {
                id: utilService.makeId(),
                fullName: utilService.makeLorem(1),
                rating: utilService.getRandomIntInclusive(1, 5),
                readAt: '06/24/2024'
            }
        ]

    }
}
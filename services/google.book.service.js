import { storageService } from './async-storage.service.js'


const books = [
    { id: 'D12C4', title: 'test 1', price: 20 },
    { id: 'G6F42', title: 'test 2', price: 30 },
    { id: 'H42G4', title: 'test 3', price: 40 }
]

export const googleBookService = {
    query,
    get,
    save,
}

function googleQuery() {
    var entities = books || []
    return new Promise(function (resolve, reject) {
        resolve(entities)
    })
}


function query(filterBy = {}) {
    return googleQuery()
        .then(books => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}
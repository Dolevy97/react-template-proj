import { storageService } from './async-storage.service.js'

const API_KEY = 'AIzaSyC3JYJV46HLqEVYXfj9bo5_b4yO0UOD_WI'

export const googleBookService = {
    query,
    get,
    save,
}


function searchGoogleBooks(value) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(value)}&key=${API_KEY}`
    return fetch(url)
        .then(res => {
            if (res.ok) return res.json()
            else throw new Error('Network response was not ok.')
        })
        .then(data => {
            return data.items
        })
        .catch(error => console.log(error))
}

function query(filterBy = {}) {
    if (!filterBy.title) return Promise.resolve(null)
    return searchGoogleBooks(filterBy.title)
        .then(books => {
            books = books.map(book => {
                return {
                    id: book.id, title: book.volumeInfo.title, subtitle: book.volumeInfo.title, authors: book.volumeInfo.authors,
                    publishedDate: book.volumeInfo.publishedDate, description: book.volumeInfo.description, pageCount: book.volumeInfo.pageCount,
                    categories: book.volumeInfo.categories, thumbnail: book.volumeInfo.imageLinks.thumbnail, language: book.volumeInfo.language
                }
            })
            // if (filterBy.title) {
            //     const regex = new RegExp(filterBy.title, 'i')
            //     books = books.filter(book => regex.test(book.title))
            // }
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
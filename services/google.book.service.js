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

function getImageFromGoogle(bookId) {
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`
    return fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else throw new Error('Network response was not ok.')
        })
        .then(data => {
            return data.volumeInfo.imageLinks.small
        })
        .catch(error => console.log(error))
}

function query(filterBy = {}) {
    if (!filterBy.title) return Promise.resolve(null)
    return searchGoogleBooks(filterBy.title)
        .then(books => {
            // Map over each book to fetch its thumbnail and format the data
            const promises = books.map(book => {
                return getImageFromGoogle(book.id)
                    .then(thumbnail => {
                        thumbnail = thumbnail.slice(4)
                        thumbnail = 'https' + thumbnail
                        return {
                            id: book.id,
                            title: book.volumeInfo.title,
                            subtitle: book.volumeInfo.subtitle || '',
                            authors: book.volumeInfo.authors || [],
                            publishedDate: book.volumeInfo.publishedDate,
                            description: book.volumeInfo.description || '',
                            pageCount: book.volumeInfo.pageCount || 0,
                            categories: book.volumeInfo.categories || [],
                            thumbnail: thumbnail,
                            language: book.volumeInfo.language
                        };
                    });
            });
            return Promise.all(promises);
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
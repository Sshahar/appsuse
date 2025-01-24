import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getFilterFromSearchParams,
    addReview,
    addGoogleBook,
    getCategoryCount,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minListPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minListPrice)
            }
            if (filterBy.description) {
                const regExp = new RegExp(filterBy.description, 'i')
                books = books.filter(book => regExp.test(book.description))
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', listPrice = '') {
    return { title, listPrice }
}

function getDefaultFilter() {
    return { txt: '', minListPrice: '', description: '' }
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const minListPrice = searchParams.get('minListPrice') || ''
    const description = searchParams.get('description') || ''

    return {
        txt,
        minListPrice,
        description,
    }
}

function addReview(bookId, review) {
    return get(bookId)
        .then(book => {
            review = { ...review, id: utilService.makeId() }
            book.reviews = book.reviews ? [...book.reviews, review] : [review]
            return save(book)
        })
        .then(() => review)
}

// Google book for example at: assets/json/google-volumes.json
function addGoogleBook(googleBook) {
    const { id, title, authors, publishedDate, description, pageCount, categories, imageLinks, language, } = googleBook.volumeInfo
    const { thumbnail } = imageLinks

    const book = {
        id,
        title,
        subtitle: utilService.makeLorem(4),
        authors,
        publishedDate,
        description,
        pageCount,
        categories,
        thumbnail,
        language,
        listPrice: {
            amount: utilService.getRandomIntInclusive(80, 500),
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        }
    }
    console.log('Created from google book:', book)

    return save(book)
}

function getCategoryCount() {
    return query()
        .then(books => {
            // output example: {'Horror': 3, 'Fasion': 555}
            const categories = {}
            books.forEach(book => {
                book.categories.forEach(cat => {
                    if (!categories[cat]) categories[cat] = 0
                    categories[cat]++
                })
            })
            console.log('categories:', categories)
            return categories
        })
        .then(categories => {
            // format from: 
            // {'Horror': 3, 'Fasion': 555}
            // to: 
            // [{ category: 'Horror', count: 3 },],
            const catsForChart = []
            for (const key in categories) {
                const count = categories[key]
                catsForChart.push({ category: key, count })
            }
            return catsForChart
        })
}

function _createBooks() {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (books && books.length) return
    books = []

    for (let i = 0; i < 20; i++) {
        const book = {
            id: utilService.makeId(),
            title: utilService.makeLorem(2),
            subtitle: utilService.makeLorem(4),
            authors: [
                utilService.makeLorem(1)
            ],
            publishedDate: utilService.getRandomIntInclusive(1950, 2024),
            description: utilService.makeLorem(20),
            pageCount: utilService.getRandomIntInclusive(20, 600),
            categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
            thumbnail: `apps/book/assets/img/${i + 1}.jpg`,
            language: "en",
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            }
        }
        books.push(book)
    }
    console.log('books', books)
    utilService.saveToStorage(BOOK_KEY, books)
}

// function _createBook(title, listPrice = { amount: 250, currencyCode: 'ILS', isOnSale: false }) {
//     const book = getEmptyBook(title, listPrice)
//     book.id = makeId()
//     return book
// }

function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { googleBookService } from '../services/googleBook.service.js'

const { useState, useEffect } = React

export function BookAdd() {
    const [bookName, setBookName] = useState('')
    const [books, setBooks] = useState('')

    useEffect(() => {
        // debounce implementation
        const interval = setTimeout(searchBook, 400)
        return () => clearInterval(interval)
    }, [bookName])

    function searchBook() {
        googleBookService.query()
            .then(books => {
                // is book name in any of books?
                let regExp = new RegExp(bookName, 'i')
                return books.filter(book => regExp.test(book.volumeInfo.title))
            })
            .then(filteredBooks => {
                setBooks(() => filteredBooks)
            })
            .catch(err => console.log(err))
    }

    function onAddBook(book) {
        bookService.addGoogleBook(book)
            .then(() => showSuccessMsg('Book added'))
            .catch(() => showErrorMsg('Cannot add book'))
    }

    return (
        <React.Fragment>
            <input value={bookName} onChange={(e) => setBookName(e.target.value)} type="text" name="bookName" />
            {books &&
                <ul>
                    {books.map(book => (
                        <React.Fragment>
                            <li key={book.id}>{book.volumeInfo.title} <button onClick={() => onAddBook(book)}>+</button></li>
                        </React.Fragment>
                    )
                    )}
                </ul>
            }
        </React.Fragment>
    )
}
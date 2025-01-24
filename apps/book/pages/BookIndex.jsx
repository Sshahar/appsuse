import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { getTruthyValues } from "../../../services/util.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM
const { Link } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy)) // {txt:'aba'}
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Problem getting books:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
                showSuccessMsg('Book removed')
            })
            .catch(err => {
                console.log('Problems removing book:', err)
                showErrorMsg('Cannot remove book')
            })
    }

    function onSetFilter(filterByToEdit) {
        // console.log('filterByToEdit - index:', filterByToEdit)
        setFilterBy(filterBy => ({ ...filterBy, ...filterByToEdit }))
    }
    const headStyle = {
        display: 'flex',
        gap: '1em',
        alignItems: 'center'
    }

    if (!books) return <div>Loading...</div>
    const { txt, minListPrice, description } = filterBy
    return (
        <section className="book-index">

            <h1>Book Index!</h1>
            <React.Fragment>
                <div style={headStyle}>
                    <BookFilter onSetFilter={onSetFilter} filterBy={{ txt, minListPrice, description }} />
                    <Link className='btn' to='dashboard'>Dashboard</Link>
                </div>
                <BookList
                    onRemoveBook={onRemoveBook}
                    books={books}
                />
            </React.Fragment>

        </section>
    )

}
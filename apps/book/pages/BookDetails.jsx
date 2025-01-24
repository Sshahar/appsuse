import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"

const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const { bookId } = useParams()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then(book => {
                console.log('book:', book.nextBookId)
                setBook(book)
            })
            .catch(err => {
                console.log('Problem getting book:', err)
            })

    }

    function getReadingType(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Descent Reading'
        if (pageCount < 100) return 'Light reading'
    }

    function getPublishState(publishDate) {
        const timeInYears = (new Date() - publishDate) / (1000 * 60 * 60 * 24 * 365)

        if (timeInYears > 10) return 'Vintage'
        if (timeInYears < 1) return 'New'
    }

    function getPriceClass(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'
    }

    function onSaveReview(reviewToAdd) {
        console.log('reviewToAdd:', reviewToAdd)
        bookService.addReview(bookId, reviewToAdd)
            .then(savedReview => {
                setBook(prevBook => {
                    const newReviews = prevBook.reviews ? [...prevBook.reviews, savedReview] : [savedReview]
                    return { ...prevBook, reviews: newReviews }
                })

                console.log('savedReview:', savedReview)
                showSuccessMsg('Review added')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot add review')
            })
    }

    if (!book) return <div>Loading...</div>
    const { title, listPrice, pageCount, publishedDate, description } = book

    const options = { style: 'currency', currency: listPrice.currencyCode }
    const price = new Intl.NumberFormat("en-US", options)
        .format(listPrice.amount)
    const readingType = getReadingType(pageCount)
    const publishState = getPublishState(publishedDate)
    const priceClass = getPriceClass(listPrice.amount)
    const isOnSale = listPrice.isOnSale ? 'On Sale' : ''
    const tags = [readingType, publishState, isOnSale].filter(t => t).join(', ')
    const nextPrevStyle = {"display":"flex","width":"100%","justifyContent":"space-between"}
    
    return (
        <section className="book-details">
            <div style={nextPrevStyle}>
                <button>
                    <Link to={`/book/${book.prevBookId}`}>Previous book</Link>
                </button>
                <button>
                    <Link to={`/book/${book.nextBookId}`}>Next book</Link>
                </button>
            </div>
            <h1>{title}</h1>
            <h1>Price: <span className={priceClass}>{price}</span></h1>
            {/* what if pageCount between 100 and 200? no reading type! */}
            {tags && <h2>{tags}</h2>}
            <LongTxt txt={description} />

            <button>
                <Link to='/book'>Back</Link>
            </button>

            {book.reviews && <ReviewList reviews={book.reviews} />}

            <AddReview bookId={bookId} onSaveReview={onSaveReview} />
        </section>
    )
}
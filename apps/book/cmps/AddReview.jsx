import { reviewService } from "../services/review.service.js"
import { RadioInput } from "./Inputs.jsx"

const { useState, useRef, useEffect } = React
const { useParams } = ReactRouterDOM

export function AddReview({ onSaveReview }) {
    const [reviewToAdd, setReviewToAdd] = useState(reviewService.getEmptyReview())
    const [ratingType, setRatingType] = useState('text')
    const { reviewId } = useParams()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

        }

        setReviewToAdd(prevReviewToAdd => ({ ...prevReviewToAdd, [field]: value }))
    }

    function handleRatingTypeChange({ target }) {
        const field = target.name
        let value = target.value

        setRatingType(value)
    }

    function saveReview(ev) {
        ev.preventDefault()
        console.log('rating:', rating)
        if (!fullname || !rating) return

        onSaveReview(reviewToAdd)
    }

    const { fullname, rating, readAt, } = reviewToAdd

    return (
        <section className="review-add" style={{margin: 'auto'}}>
            <h1>{reviewId ? 'Review Add' : 'Review Add'}</h1>

            <form onSubmit={saveReview}>
                <label htmlFor="fullname">fullname</label>
                <input value={fullname} onChange={handleChange} type="text" id='fullname' name='fullname' />

                {/* choose rating component */}
                <RadioInput inputs={['text', 'select', 'stars',]} handleChange={handleRatingTypeChange} />

                <DynamicCmp rating={rating} handleChange={handleChange} cmpType={ratingType} />
                {/* <RateByTextbox rating={rating} handleChange={handleChange} /> */}

                <label htmlFor="readAt">readAt</label>
                <input value={readAt} onChange={handleChange} type="date" id='readAt' name='readAt' />

                <button>Save</button>
            </form>
        </section>
    )
}

function DynamicCmp(props) {
    // console.log('props:', props)
    switch (props.cmpType) {
        case 'text':
            return <RateByTextbox {...props} />
        case 'select':
            return <RateBySelect {...props} />
        case 'stars':
            return <RateByStars {...props} />
    }
}


function RateByTextbox({ rating, handleChange }) {
    return (
        <React.Fragment>
            <label htmlFor="rating">rating</label>
            <input value={rating} onChange={handleChange} type="number" id='rating' name='rating' />
        </React.Fragment>
    )
}

function RateBySelect({ rating, handleChange }) {
    return (
        <React.Fragment>
            <label htmlFor="rating">rating</label>
            <select value={rating} onChange={handleChange} name='rating'>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </React.Fragment>
    )
}

function RateByStars({ rating, handleChange }) {
    const [stars, setStars] = useState(rating)
    const isSelected = useRef(false)

    useEffect(() => {
        handleChange({ target: { name: 'rating', value: stars } })

    }, [stars])

    function getRenderStars() {
        const maxStars = 5
        const txtStars = '★'.repeat(stars) + '☆'.repeat(maxStars - stars)
        return txtStars.split('').map((star, i) => (
            <span key={i} onMouseEnter={() => starHover(i + 1)} onClick={() => onStarClick(i + 1)}>
                {star}
            </span>
        ))
    }

    function starHover(starIndex) {
        if (isSelected.current) return
        setStars(() => starIndex)
    }

    function onStarClick(starIndex) {
        isSelected.current = true
        setStars(() => starIndex)
    }

    return (
        <React.Fragment>
            <label htmlFor="rating">rating</label>
            {/* could you make it work with <ul><li> ? */}
            <div>{getRenderStars()}</div>
        </React.Fragment>
    )
}
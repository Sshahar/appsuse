export function ReviewList({ reviews }) {

    console.log('reviews:', reviews[reviews.length - 1])
    return (
        <ul className="review-list">
            {reviews.map(review => (
                <li key={review.id}>
                    <section>

                        <div>
                            <label htmlFor="fullname">fullname: <span>{review.fullname}</span></label>
                        </div>
                        <div>
                            <label htmlFor="rating">rating: <span>{review.rating}</span></label>
                        </div>

                        <div>
                            <label htmlFor="readAt">readAt: <span>{review.readAt}</span></label>
                        </div>
                    </section>
                </li>
            ))}
        </ul>
    )
}
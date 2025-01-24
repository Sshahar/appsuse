
export function BookPreview({ book }) {

    const { title, listPrice, thumbnail } = book

    const options = { style: 'currency', currency: listPrice.currencyCode }
    const price = new Intl.NumberFormat("en-US", options)
        .format(listPrice.amount)
    return (
        <article className="book-preview">
            <h2>{title}</h2>
            <h4>Book Price: {price}</h4>
            <img src={thumbnail} alt="Book Image" />
        </article>
    )

}
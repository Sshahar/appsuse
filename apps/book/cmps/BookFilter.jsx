const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {

    //* { txt: '', minListPrice: '' }
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSubmit(ev) {
        ev.preventDefault()
        console.log('Submit filter')
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            default:
                break;
        }
        setFilterByToEdit(filterBy => ({ ...filterBy, [field]: value }))
    }

    // function onTxtChange(ev) {
    //     setFilterByToEdit(filterBy => ({ ...filterBy, txt: ev.target.value }))
    // }

    // function onMinListPriceChange(ev) {
    //     setFilterByToEdit(filterBy => ({ ...filterBy, minListPrice: ev.target.value }))
    // }

    const { txt, minListPrice, description } = filterByToEdit
    return (
        <section className="book-filter" style={{width: 'min-content'}}>
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="txt">Title</label>
                <input id="txt" name="txt" onChange={handleChange} value={txt} type="text" />

                <label htmlFor="minListPrice">Min ListPrice</label>
                <input id="minListPrice" name="minListPrice" onChange={handleChange} value={minListPrice || ''} type="number" />

                <label htmlFor="description">Book Description</label>
                <input id="description" name="description" onChange={handleChange} value={description} type="text" />

                {/* <button>Submit</button> */}
            </form>
        </section>
    )
}
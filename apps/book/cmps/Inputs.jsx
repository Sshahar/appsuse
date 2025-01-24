export function RadioInput({ handleChange, inputs }) {
    // const inputs = ['text', 'select', 'stars',]

    return (
        <fieldset>
            <legend>Select a rating type:</legend>

            {inputs.map((ipt, idx) => (
                <div key={ipt}>
                    <input onChange={handleChange} type="radio" name="ratingType" value={ipt} defaultChecked={!idx} />
                    <label htmlFor={ipt} style={{ textTransform: 'capitalize' }}>{ipt}</label>
                </div>
            ))
            }

        </fieldset>
    )
}
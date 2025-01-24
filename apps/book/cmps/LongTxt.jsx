const { useState } = React

export function LongTxt({ txt, length = 100 }) {
    const [isPreview, setIsPreview] = useState(true)

    const txtPreview = txt.slice(0, length)
    const readMoreTxt = isPreview ? 'read more...' : 'read less...'

    return <React.Fragment>
        <p>
            {isPreview ? txtPreview : txt}
            <button onClick={() => setIsPreview(prevPreview => !prevPreview)}>{readMoreTxt}</button>
        </p>
    </React.Fragment>
}
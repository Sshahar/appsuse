import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

const { useParams, Link } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(mail => setMail(mail))
            .catch(err => {
                console.log('Problem getting book:', err)
            })
    }

    const fromToStyle = { "margin": "1em", "display": "grid", "gridTemplateColumns": "1fr 1fr" }

    const bodyStyle = {
        fontSize: '1.3em',
    }

    const toStyle = {
        'gridColumn': '1'
    }

    const dateStyle = {
        'gridRow': '1',
        'gridColumn': '2',
    }

    if (!mail) return <div>Loading...</div>
    return (
        <React.Fragment>
            {/* Subject*/}
            {/* (TODO: add labels such as 'inbox') */}
            <h2>{mail.subject}</h2>
            {/* from, to, */}
            <section style={fromToStyle}>
                {/* From */}
                <div>
                    <span>From: {mail.from}</span>
                </div>
                {/* To */}
                <div style={toStyle}>
                    {/* {mail.to} */}
                    <span>to me</span>
                </div>
                {/* Date */}
                <span style={dateStyle}>{utilService.getLocaleDate(mail.sentAt)}</span>
                {/* Star toggle button */}
                {/* Reply */}

            </section>
            {/* body */}
            <section style={bodyStyle}>
                {mail.body}
            </section>
            {/* {JSON.stringify(mail)} */}
        </React.Fragment>
    )
}

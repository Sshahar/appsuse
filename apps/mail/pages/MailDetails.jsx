import { mailService } from "../services/mail.service.js"

const { useParams, Link } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const {mailId} = useParams()

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

    if (!mail) return <div>Loading...</div>
    return (
        <React.Fragment>
            <div>Mail Details</div>
            {JSON.stringify(mail)}
        </React.Fragment>
    )
}

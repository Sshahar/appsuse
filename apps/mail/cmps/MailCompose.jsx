import { mailService } from "../services/mail.service.js"
const { useState, useEffect, useRef } = React

export function MailCompose({sendMail}) {
    // TODO: move service calls to parent
    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())

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

        setMailToAdd(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSendMail(ev) {
        ev.preventDefault()
        
        sendMail(mailToAdd)
    }

    const { to, subject, body } = mailToAdd

    return (
        <div className="mail-compose">
            <form className="main-compose-form" onSubmit={onSendMail}>
                {/* To */}
                <div>
                    <label htmlFor="">To: </label>
                    <input value={to} onChange={handleChange} type="text" name='to' />
                </div>
                {/* Subject */}
                <div>
                    <label htmlFor="">Subject: </label>
                    <input value={subject} onChange={handleChange} type="text" name='subject' />
                </div>
                {/* Body */}
                <textarea value={body} onChange={handleChange} type="text" name='body' ></textarea><br />
                {/* Send */}
                <button>Send</button>
            </form>

        </div>
    )
}

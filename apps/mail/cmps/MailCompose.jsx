import { mailService } from "../services/mail.service.js"
const { useState, useEffect, useRef } = React

export function MailCompose({ sendMail, setCmpType }) {
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

    function onCloseCompose() {
        setCmpType('list')
    }

    const { to, subject, body } = mailToAdd

    return (
        <div className="mail-compose">
            <div className="new-message-header">
                <span>New Message</span>
                <button className="clean-btn" onClick={onCloseCompose}>
                    <img className="icon" src={`assets/img/mail/x.svg`} />
                </button>
            </div>
            <div>
                <form className="main-compose-form" onSubmit={onSendMail}>
                    {/* To */}
                    <div className="head-div">
                        <input value={to} onChange={handleChange} type="text" name='to' autoFocus placeholder="Recipient" />
                    </div>
                    {/* Subject */}
                    <div className="head-div">
                        <input value={subject} onChange={handleChange} type="text" name='subject' placeholder="Subject" />
                    </div>
                    {/* Body */}
                    <textarea value={body} onChange={handleChange} type="text" name='body' ></textarea><br />
                    {/* Send */}
                    <button className="compose-send-btn">Send</button>
                </form>
            </div>

        </div>
    )
}

const { useState } = React

import { globalState } from "../services/globalState.js"

const IMG_PATH = globalState.getImgPath()

export function MailCompose({ sendMail }) {
    const [inputs, setInputs] = useState({})

    function handleChange(ev) {
        const { name, value } = ev.target
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }))
    }

    function onSaveAndClose() {
        sendMail(inputs, true)
    }

    function composeMail(ev) {
        ev.preventDefault()
        sendMail(inputs, false)
    }

    return (
        <div className="mail-compose">
            {/* Header */}
            <section className="compose-header">
                <span>New Message</span>
                <button className="clean-btn" onClick={onSaveAndClose}>
                    <img className="mail-icon0" src={`${IMG_PATH}/close.png`} alt="" />
                </button>
            </section>

            {/* Form */}
            <form onSubmit={composeMail}>
                <div>
                    <input value={inputs.to || ''} onChange={handleChange} name="to" autoFocus type="text" placeholder="Recipients" />
                </div>
                <div>
                    <input value={inputs.subject || ''} onChange={handleChange} name="subject" type="text" placeholder="Subject" />
                </div>
                <div className="body">
                    <textarea value={inputs.body || ''} onChange={handleChange} name="body"></textarea>
                </div>

                {/* Buttons */}
                <section className="form-footer">
                    <button className="clean-btn">Send</button>
                </section>
            </form>
        </div>
    )
}
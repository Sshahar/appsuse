import { globalState } from "../services/globalState.js"

const IMG_PATH = globalState.getImgPath()

export function MailCompose({ saveAndClose }) {

    function onSaveAndClose() {
        saveAndClose()
    }

    return (
        <div className="mail-compose">
            {/* Header */}
            <section className="compose-header">
                <span>New Message</span>
                <button className="clean-btn" onClick={onSaveAndClose}>
                    <img src={`${IMG_PATH}/save-and-close.png`} alt="" />
                </button>
            </section>

            {/* Form */}
            <form>
                <div>
                    <input autoFocus type="text" placeholder="Recipients"/>
                </div>
                <div>
                    <input type="text" placeholder="Subject"/>
                </div>
                <div className="body">
                    <textarea name="" id=""></textarea>
                </div>

                {/* Buttons */}
                <section className="form-footer">
                    <button className="clean-btn">Send</button>
                </section>
            </form>
        </div>
    )
}
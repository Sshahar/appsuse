import { globalState } from "../services/globalState.js"

const IMG_PATH = globalState.getImgPath()

export function MailCompose({ saveAndClose }) {

    function onSaveAndClose() {
        saveAndClose()
    }

    return (
        <div className="mail-compose">Mail compose
            <button className="clean-btn" onClick={onSaveAndClose}>
                <img src={`${IMG_PATH}/save-and-close.png`} alt="" />
            </button>
        </div>
    )
}
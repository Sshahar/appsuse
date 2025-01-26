import { globalState } from "../services/globalState.js"

export function FolderList() {
    const IMG_PATH = globalState.getImgPath()

    return (
        <ul className="clean-list">
            <li>
                <img className="icon" src={`${IMG_PATH}/inbox.png`} />
                <span className="capitalize">inbox</span>
            </li>
            <li>
                <img className="icon" src={`${IMG_PATH}/starred.png`} />
                <span className="capitalize">starred</span>
            </li>
            <li>
                <img className="icon" src={`${IMG_PATH}/snoozed.png`} />
                <span className="capitalize">snoozed</span>
            </li>
            <li>
                <img className="icon" src={`${IMG_PATH}/important.png`} />
                <span className="capitalize">important</span>
            </li>
            <li>
                <img className="icon" src={`${IMG_PATH}/sent.png`} />
                <span className="capitalize">sent</span>
            </li>
            <li>
                <img className="icon" src={`${IMG_PATH}/drafts.png`} />
                <span className="capitalize">drafts</span>
            </li>
        </ul>
    )
}

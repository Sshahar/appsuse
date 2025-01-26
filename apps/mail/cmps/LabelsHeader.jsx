import { globalState } from "../services/globalState"

const IMG_PATH = globalState.getImgPath()

export function LabelsHeader() {
    return (<section className="labels-header">
        <ul className="clean-list">
            <li>
                <img className="icon" src={`${IMG_PATH}/inbox.png`} />
                <span className="capitalize">primary</span>
            </li>
            <li>
                <img className="icon" src={`${IMG_PATH}/promotions.png`} />
                <span className="capitalize">promotions</span>
            </li>
            <li>
                <img className="icon" src={`${IMG_PATH}/social.png`} />
                <span className="capitalize">social</span>
            </li>
            <li>
                <img className="icon" src={`${IMG_PATH}/updates.png`} />
                <span className="capitalize">updates</span>
            </li>
            <li>
                <img className="icon" src={`${IMG_PATH}/forums.png`} />
                <span className="capitalize">forums</span>
            </li>
        </ul>
    </section>
    )
}
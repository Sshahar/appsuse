import { globalState } from "../services/globalState.js"

const IMG_PATH = globalState.getImgPath()

export function PreviewList() {
    return (
        <section>
            <ul className="clean-list">
                <li className="mail-preview">
                    {/* TODO: add drag and drop icon on hover */}
                    {/* Left button group */}
                    <div className="left-btns">
                        {/* Select */}
                        <input type="checkbox" />
                        {/* Star */}
                        <img className="icon" src={`${IMG_PATH}/starred.png`} />
                        {/* Important */}
                        <img className="icon" src={`${IMG_PATH}/important.png`} />
                    </div>
                    {/* Name */}
                    <span className="name">h-ridee</span>
                    <div className="main-text">
                        {/* Subject */}
                        <span className="subject">Nvidia Accounts -
                            {/* Body */}
                            <span className="body">Hello,
                                Your account just logged account just logged account just logged account just logged in using a(n) Windows device we don't
                            </span>
                        </span>

                    </div>
                    {/* Date  */}
                    <span className="date">29/12/2024</span>
                </li>
            </ul>
        </section>
    )
}
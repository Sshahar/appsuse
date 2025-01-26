import { FolderList } from "../cmps/FolderList.jsx"
import { PreviewList } from "../cmps/PreviewList.jsx"
import { globalState } from "../services/globalState.js"


const IMG_PATH = globalState.getImgPath()


export function MailIndex() {
    return (
        <section className="mail-index">
            {/* Aside */}
            <FolderList />

            {/* Main */}
            <main>
                {/* Pagination header */}
                <form className="pagination-header">
                    {/* Select buttons */}
                    <section className="left-btns">
                        <div>
                            <input type="checkbox" />
                            <img className="icon" src={`${IMG_PATH}/checkbox-arrow.png`} />
                        </div>
                        <img className="icon" src={`${IMG_PATH}/refresh.png`} />
                        <img className="icon" src={`${IMG_PATH}/more.png`} />
                    </section>
                    {/* Pagination */}
                    <section className="right-btns">
                        <span>1–50 of 1,231</span>
                        <img className="icon" src={`${IMG_PATH}/newer.png`} />
                        <img className="icon" src={`${IMG_PATH}/older.png`} />
                    </section>
                </form>
                {/* Labels header */}
                <section className="labels-header">
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

                {/* Preview list */}
                <PreviewList />
            </main>
        </section>
    )
}
import { globalState } from "../services/globalState.js"

const IMG_PATH = globalState.getImgPath()

export function PaginationHeader() {
    return (<form className="pagination-header">
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
            <span className="opacity-1">1–50 of 1,231</span>
            <img className="icon" src={`${IMG_PATH}/newer.png`} />
            <img className="icon" src={`${IMG_PATH}/older.png`} />
        </section>
    </form>
    )
}

export function DetailsPaginationHeader({onDeleteMail}) {
    function _onDeleteMail() {
        onDeleteMail()
    }
    
    return (<form className="pagination-header details">
        {/* Left button group */}
        <section className="left-btns">
            {/* back-to-inbox */}
            <img className="icon opacity-1" src={`${IMG_PATH}/back-to-inbox.svg`} />

            {/* archive */}
            <img className="icon" src={`${IMG_PATH}/archive.png`} />

            {/* report-spam */}
            <img className="icon" src={`${IMG_PATH}/report-spam.png`} />

            {/* delete */}
            <img className="icon" src={`${IMG_PATH}/bin.png`} onClick={_onDeleteMail} />

            {/* |  */}
            <span className="opacity-1">|</span>

            {/* mark-as-unread */}
            <img className="icon" src={`${IMG_PATH}/mark-as-unread.png`} />

            {/* TODO: add move-to */}
            {/* TODO: add "more" */}
        </section>
        {/* Pagination */}
        <section className="right-btns">
            <span className="opacity-1">4 of 1,231</span>
            <img className="icon" src={`${IMG_PATH}/newer.png`} />
            <img className="icon" src={`${IMG_PATH}/older.png`} />
        </section>
    </form>
    )
}
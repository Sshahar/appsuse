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
            <span>1–50 of 1,231</span>
            <img className="icon" src={`${IMG_PATH}/newer.png`} />
            <img className="icon" src={`${IMG_PATH}/older.png`} />
        </section>
    </form>
    )
}
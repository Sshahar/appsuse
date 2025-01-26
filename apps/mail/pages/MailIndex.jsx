const IMG_PATH = 'apps/mail/assets/img'

export function MailIndex() {
    return (
        <section className="mail-index">
            {/* Aside */}
            <aside className="mail-folder-list">
                {/* Compose */}
                <button className="compose"><img className="icon" src={`${IMG_PATH}/compose.png`} /> Compose</button>
                {/* Folder list */}
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
                {/* Labels (TODO: add them) */}
            </aside>
            {/* Main */}
            <main>
                {/* Pagination header */}
                <form className="pagination-header">
                    {/* Select buttons */}
                    <section>
                        <input type="checkbox" />
                        <img className="icon" src={`${IMG_PATH}/checkbox-arrow.png`} />
                        <img className="icon" src={`${IMG_PATH}/refresh.png`} />
                        <img className="icon" src={`${IMG_PATH}/more.png`} />
                    </section>
                    {/* Pagination */}
                    <section>
                        <span>1-50 of 1,231</span>
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
                <section>
                    <ul className="clean-list">
                        <li className="mail-preview">
                            {/* TODO: add drag and drop icon on hover */}
                            {/* Select */}
                            <input type="checkbox" />
                            {/* Star */}
                            <img className="icon" src={`${IMG_PATH}/starred.png`} />
                            {/* Important */}
                            <img className="icon" src={`${IMG_PATH}/important.png`} />
                            {/* Name */}
                            <span className="name">h-ridee</span>
                            {/* Subject */}
                            <span className="subject">Nvidia Accounts -</span>
                            {/* Body */}
                            <span className="body">Hello,
                                Your account just logged in using a(n) Windows device we don't</span>
                            {/* Date  */}
                            <span className="date">29/12/2024</span>
                        </li>
                    </ul>
                </section>
            </main>
        </section>
    )
}
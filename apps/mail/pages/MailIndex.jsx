const IMG_PATH = 'apps/mail/assets/img'

export function MailIndex() {
    return (
        <section className="mail-index">
            {/* Aside */}
            <aside>
                {/* Compose */}
                <button><img className="keep-auto" src={`${IMG_PATH}/compose.png`} /> Compose</button>
                {/* Folder list */}
                <ul className="clean-list">
                    <li>
                        <img className="keep-auto" src={`${IMG_PATH}/inbox.png`} />
                        <span className="capitalize">inbox</span>
                    </li>
                    <li>
                        <img className="keep-auto" src={`${IMG_PATH}/starred.png`} />
                        <span className="capitalize">starred</span>
                    </li>
                    <li>
                        <img className="keep-auto" src={`${IMG_PATH}/snoozed.png`} />
                        <span className="capitalize">snoozed</span>
                    </li>
                    <li>
                        <img className="keep-auto" src={`${IMG_PATH}/important.png`} />
                        <span className="capitalize">important</span>
                    </li>
                    <li>
                        <img className="keep-auto" src={`${IMG_PATH}/sent.png`} />
                        <span className="capitalize">sent</span>
                    </li>
                    <li>
                        <img className="keep-auto" src={`${IMG_PATH}/drafts.png`} />
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
                        <img className="keep-auto" src={`${IMG_PATH}/checkbox-arrow.png`} />
                        <img className="keep-auto" src={`${IMG_PATH}/refresh.png`} />
                        <img className="keep-auto" src={`${IMG_PATH}/more.png`} />
                    </section>
                    {/* Pagination */}
                    <section>
                        <span>1-50 of 1,231</span>
                        <img className="keep-auto" src={`${IMG_PATH}/newer.png`} />
                        <img className="keep-auto" src={`${IMG_PATH}/older.png`} />
                    </section>
                </form>
                {/* Labels header */}
                <section className="labels-header">
                    <ul className="clean-list">
                        <li>
                            <img className="keep-auto" src={`${IMG_PATH}/inbox.png`} />
                            <span className="capitalize">primary</span>
                        </li>
                        <li>
                            <img className="keep-auto" src={`${IMG_PATH}/promotions.png`} />
                            <span className="capitalize">promotions</span>
                        </li>
                        <li>
                            <img className="keep-auto" src={`${IMG_PATH}/social.png`} />
                            <span className="capitalize">social</span>
                        </li>
                        <li>
                            <img className="keep-auto" src={`${IMG_PATH}/updates.png`} />
                            <span className="capitalize">updates</span>
                        </li>
                        <li>
                            <img className="keep-auto" src={`${IMG_PATH}/forums.png`} />
                            <span className="capitalize">forums</span>
                        </li>
                    </ul>
                </section>
                {/* Preview list */}
                <div>Mail preview list </div>
            </main>
        </section>
    )
}
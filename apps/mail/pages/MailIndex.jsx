const IMG_PATH = 'apps/mail/assets/img'

export function MailIndex() {
    return (
        <React.Fragment>
            {/* Aside */}
            <aside>
                {/* Compose */}
                <button><img className="keep-auto" src={`${IMG_PATH}/compose.png`} /> Compose</button>
                {/* Folder list */}
                <ul className="clean-list">
                    <li>inbox</li>
                    <li>starred</li>
                    <li>snoozed</li>
                    <li>important</li>
                    <li>sent</li>
                    <li>drafts</li>
                </ul>
                {/* Labels (TODO: add them) */}
            </aside>
            {/* Main */}
            <main>
                {/* Pagination header */}
                <form>
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
                <section>
                    <ul className="clean-list">
                        <li>primary</li>
                        <li>promotions</li>
                        <li>social</li>
                        <li>updates</li>
                        <li>forums</li>
                    </ul>
                </section>
                {/* Preview list */}
                <div>Mail preview list </div>
            </main>
        </React.Fragment>
    )
}
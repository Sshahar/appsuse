import { globalState } from "../services/globalState.js"

const IMG_PATH = globalState.getImgPath()

export function MailDetails() {
    return (
        <React.Fragment>
            {/* Header */}
            <section className="header">
                <div className="left-section">
                    {/* Subject */}
                    <h2>long text</h2>
                    {/* Important */}
                    <span><img className="icon" style={{ 'marginBlockStart': '5px' }} src={`${IMG_PATH}/important.png`} alt="" /></span>
                    {/* TODO: add Label */}
                </div>

                <div className="right-section">
                    {/* Print */}
                    <img className="icon grey" src={`${IMG_PATH}/printer.svg`} alt="" />
                    {/* TODO: in a new window */}
                    <img className="icon grey" src={`${IMG_PATH}/detach-window.svg`} alt="" />
                </div>
            </section>
            {/* Subheader */}
            <section className="subheader">
                <div className="left-section">
                    {/* Profile picture */}
                    <img className="mail-icon3 circle" src="assets/img/profile.jpeg" />
                    {/* Name */}
                    <span className="name">Shahar margalit</span>
                    {/* From */}
                    <span className="opacity-1">&lt;shaharma@gmail.com&gt;</span>
                </div>

                <div className="right-section">

                    {/* Date */}
                    <span className="opacity-1">11:00 (6 hours ago)</span>
                    {/* Star */}
                    <img className="icon" src={`${IMG_PATH}/not-starred.png`} alt="" />
                    {/* TODO: add reaction */}
                    {/* Reply */}
                    <img className="icon" src={`${IMG_PATH}/reply.png`} alt="" />
                </div>
                {/* TODO: add More */}
            </section>
            {/* Body */}
            <section className="body">
                <span>
                    {"with some text, maybe?\n\
                    with some text, maybe?with some text, maybe?\n\
                    with some text, maybe?with some text, maybe?with some text, maybe?\n\
\n\
                    with some text, maybe?with some text, maybe?with some text, maybe?with some text, maybe?\n\
\n\
\n\
                    with some textaybe?\n\
                    with some text, maybe?with some text, maybe?\n\
\n\
                    with some text, maybe?with some text, maybe?".split('').map((c, i) => {
                        if (c === '\n') return <React.Fragment key={i}><br /></React.Fragment>
                        return <React.Fragment key={i}>{c}</React.Fragment>
                    })
                    }

                </span>



            </section>
            {/* Footer */}
            <section className="footer">
                {/* Reply */}
                <button className="footer-btn">
                    <img className="icon" src={`${IMG_PATH}/reply.png`} alt="" />
                    <span>Reply</span>
                </button>
                {/* Forward */}
                <button className="footer-btn">
                    <img className="icon" src={`${IMG_PATH}/forward.png`} alt="" />
                    <span>Forward</span>
                </button>
                {/* TODO: add reaction */}
            </section>

        </React.Fragment>

    )
}
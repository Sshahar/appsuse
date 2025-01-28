import { globalState } from "../services/globalState.js"

const IMG_PATH = globalState.getImgPath()

export function MailDetails() {
    return (
        <React.Fragment>
            {/* Header */}
            <section>
                {/* Subject */}
                <h2>long text</h2>
                {/* Important */}
                {/* TODO: add Label */}
                {/* Print */}
                {/* TODO: in a new window */}
            </section>
            {/* Subheader */}
            <section>
                {/* Profile picture */}
                {/* Name */}
                {/* From */}
                {/* Date */}
                {/* Star */}
                {/* TODO: add reaction */}
                {/* Reply */}
                {/* TODO: add More */}
            </section>
            {/* Body */}
            <section>
                with some text, maybe?
                with some text, maybe?with some text, maybe?
                with some text, maybe?with some text, maybe?with some text, maybe?

                with some text, maybe?with some text, maybe?with some text, maybe?with some text, maybe?


                with some text, maybe?
                with some text, maybe?with some text, maybe?

                with some text, maybe?with some text, maybe?

            </section>
            {/* Footer */}
            <section>
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
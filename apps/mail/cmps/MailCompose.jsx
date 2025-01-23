export function MailCompose({ mails, setCmpType }) {

    return (
        <div className="mail-compose">
            <form className="main-compose-form">
                {/* To */}
                <div>
                    <label htmlFor="">To: </label>
                    <input type="text" />
                </div>
                {/* Subject */}
                <div>
                    <label htmlFor="">Subject: </label>
                    <input type="text" />
                </div>
                {/* Body */}

                <textarea></textarea><br />
                {/* Send */}
                <button>Send</button>
            </form>

        </div>
    )
}

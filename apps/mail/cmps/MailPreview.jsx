import { utilService } from '../../../services/util.service.js'

export function MailPreview({ mail }) {
    const selectStyle = {
        "height": "20px",
        "width": "20px",
        "border": "1px solid black",
    }

    const clearStyle = {
        "all": "unset",
    }

    const previewStyle = {
        "display": "flex",
        "gap": "10px",
    }

    return (
        <React.Fragment>
            <div style={previewStyle}>
                {/* Select */}
                <input type="checkbox" name="mail.id" style={selectStyle} />
                {/* Star */}
                <button style={clearStyle}>
                    <img src="apps/mail/assets/star-not.svg" />
                </button>
                {/* From */}
                <span>{mail.from}</span>
                {/* Subject */}
                <span>{mail.subject}</span>
                {/* Date \ buttons */}
                <span>{utilService.getLocaleDate(mail.sentAt)}</span>
            </div>

        </React.Fragment>
    )
}

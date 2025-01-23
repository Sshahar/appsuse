import { utilService } from '../../../services/util.service.js'

const { useLocation, useNavigate } = ReactRouter

export function MailPreview({ mail, setCmpType }) {
    const navigate = useNavigate()

    const iconStyle = {
        "height": "20px",
        "width": "20px",
    }

    const selectStyle = { "order": "0", "padding": "0 10px 0 13px", "position": "relative", "width": "20px" }

    const starStyle = { "padding": "0 10px 0 0", "WebkitBoxOrdinalGroup": "1", "WebkitOrder": "0", "order": "0", "width": "20px" }

    const previewStyle = {
        "display": "grid",
        "gridColumn": 2,
        "gridAutoFlow": "column",
        "gridTemplateColumns": "20px 20px 1fr 1fr 1fr",
        "gap": "10px",
        "backgroundColor": "#F2F6FC",
        "cursor": "pointer",
    }

    function onPreviewClick() {
        // TODO: import history for it to work
        // history.push('/mail')
        navigate(`${mail.id}`)
        setCmpType(() => 'details')
    }

    return (
        <React.Fragment>
            <div style={previewStyle} onClick={onPreviewClick}>
                {/* Select */}
                <input type="checkbox" name="mail.id" style={selectStyle} />
                {/* Star */}
                <span style={starStyle}>
                    <img style={iconStyle} src="assets/img/mail/asset 19.png" />
                </span>
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

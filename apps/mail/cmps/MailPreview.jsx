import { utilService } from '../../../services/util.service.js'

const { useLocation, useNavigate } = ReactRouter
const { useState, useEffect, useRef } = React

export function MailPreview({ mail, setCmpType, deleteMail, setMailRead, onUpdateMail }) {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false)
    const [isSelected, setIsSelected] = useState(false)

    const selectStyle = { "order": "0", "padding": "0 10px 0 13px", "position": "relative", "width": "20px" }

    const starStyle = { "padding": "0 10px 0 0", "WebkitBoxOrdinalGroup": "1", "WebkitOrder": "0", "order": "0", "width": "20px" }

    const previewStyle = {
        "display": "grid",
        "gridColumn": 2,
        "gridAutoFlow": "column",
        "gridTemplateColumns": "20px 20px 1fr 1fr 1fr",
        "gap": "10px",
        "cursor": "pointer",
    }

    function onPreviewClick() {
        // TODO: import history for it to work
        // history.push('/mail')
        navigate(`${mail.id}`)
        setCmpType(() => 'details')
        setMailRead(mail)
    }

    function onDeleteMail(ev) {
        ev.stopPropagation()

        deleteMail(mail.id)
    }

    function onHover() {
        setIsHovered(true)
    }

    function onUnhover() {
        setIsHovered(false)
    }

    function getCssClasses() {
        const classes = ['mail-preview']

        if (mail.isRead) {
            classes.push('is-read')
        } else {
            classes.push('is-not-read')
        }
        return classes.join(' ')
    }

    function onToggleSelected(ev) {
        ev.stopPropagation()
        setIsSelected(prevIsSelected => !prevIsSelected)
    }

    function onToggleStarred(ev) {
        ev.stopPropagation()
        mail.isStarred = !mail.isStarred
        onUpdateMail(mail)
    }

    // TODO: add mobile support (using cmpType)
    const cmpType = isHovered ? 'buttons' : 'date'
    const starIcon = mail.isStarred ? 'star.png' : 'star-not.png'
    return (
        <React.Fragment>
            <div className={getCssClasses()} style={previewStyle} onClick={onPreviewClick} onMouseEnter={onHover} onMouseLeave={onUnhover}>
                {/* Select */}
                <input type="checkbox" name="mail.id" style={selectStyle} onClick={onToggleSelected} defaultChecked={isSelected} />
                {/* Star */}
                <span style={starStyle} onClick={onToggleStarred}>
                    <img className="icon" src={`assets/img/mail/${starIcon}`} />
                </span>
                {/* From */}
                <span>{mail.from}</span>
                {/* Subject */}
                <span>{mail.subject}</span>
                {/* Date \ buttons */}
                <span>
                    <DynamicButtons cmpType={cmpType} sentAt={mail.sentAt || mail.createdAt} onDeleteMail={onDeleteMail} />
                </span>
            </div>

        </React.Fragment>
    )
}

function DynamicButtons(props) {
    switch (props.cmpType) {
        case 'date':
            return (<span>{utilService.getLocaleDate(props.sentAt)}</span>)
        case 'buttons':
            return (
                <span onClick={props.onDeleteMail}>
                    <img className='icon' src="assets/img/mail/trash.svg" />
                </span>)
    }
}
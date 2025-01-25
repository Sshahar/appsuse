import { utilService } from '../../../services/util.service.js'

const { useLocation, useNavigate } = ReactRouter
const { useState, useEffect, useRef } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailPreview({ mail, setCmpType, deleteMail, setMailRead, onUpdateMail }) {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const selectStyle = { "order": "0", "padding": "0 10px 0 13px", "position": "relative", "width": "20px" }

    const starStyle = { "padding": "0 10px 0 0", "WebkitBoxOrdinalGroup": "1", "WebkitOrder": "0", "order": "0", "width": "20px" }

    function onPreviewClick() {
        // Are we in Draft folder?
        const label = searchParams.get('labels')
        if (label === 'draft') {
            setCmpType(() => 'compose')
            // TODO: pass data to MailCompose
            return
        }

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

            <div className={getCssClasses()} onClick={onPreviewClick} onMouseEnter={onHover} onMouseLeave={onUnhover}>
                {/* Select */}
                <input className='select' type="checkbox" name="mail.id" style={selectStyle} onClick={onToggleSelected} defaultChecked={isSelected} />
                {/* Star */}
                <span className='star' style={starStyle} onClick={onToggleStarred}>
                    <img className="icon" src={`assets/img/mail/${starIcon}`} />
                </span>
                {/* From */}
                <span>{mail.from}</span>
                {/* Subject */}
                <span className='subject'>{mail.subject}</span>
                {/* Date \ buttons */}
                <DynamicButtons className='date' cmpType={cmpType} sentAt={mail.sentAt || mail.createdAt} onDeleteMail={onDeleteMail} />
            </div>

        </React.Fragment>
    )
}

function DynamicButtons(props) {
    switch (props.cmpType) {
        case 'date':
            return (<span className={props.className}>{utilService.getLocaleDate(props.sentAt)}</span>)
        case 'buttons':
            return (
                <span onClick={props.onDeleteMail}>
                    <img className='icon' src="assets/img/mail/trash.svg" />
                </span>)
    }
}
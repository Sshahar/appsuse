import { globalState } from "../services/globalState.js"
import { utilService } from "../../../services/util.service.js"

const IMG_PATH = globalState.getImgPath()

export function PreviewList({ mails }) {

    function _getDate({ sentAt, createdAt }) {
        const date = sentAt || createdAt
        return utilService.getLocaleDate(date)
    }

    function _getStarPath({ isStarred }) {
        debugger
        let src = 'not-starred.png'
        if (isStarred) src = 'starred.png'
        return `${IMG_PATH}/${src}`
    }

    function _getStarClasses({ isStarred }) {
        const classes = ['icon']
        if (isStarred) classes.push('filled')
        return classes.join(' ')
    }

    return (
        <section>
            <ul className="clean-list">
                {mails.map(mail => (
                    <li key={mail.id} className="mail-preview">
                        {/* TODO: add drag and drop icon on hover */}
                        {/* Left button group */}
                        <div className="left-btns">
                            {/* Select */}
                            <input type="checkbox" />
                            {/* Star */}
                            <img className={_getStarClasses(mail)} src={_getStarPath(mail)} />
                            {/* Important */}
                            <img className="icon" src={`${IMG_PATH}/important.png`} />
                        </div>
                        {/* Name */}
                        <span className="name">{mail.from}</span>
                        <div className="main-text">
                            {/* Subject */}
                            <span className="subject">{mail.subject}
                                {/* Body */}
                                <span className="body">{mail.body}</span>
                            </span>

                        </div>
                        {/* Date  */}
                        <span className="date">{_getDate(mail)}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
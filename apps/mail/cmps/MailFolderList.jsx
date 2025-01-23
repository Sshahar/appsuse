const { useLocation, useNavigate } = ReactRouter
const { useParams, Link } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailFolderList({ setCmpType, filterByLabel, initSelectedFolder }) {
    const [selectedFolder, setSelectedFolder] = useState(initSelectedFolder)
    console.log('initSelectedFolder:', initSelectedFolder)
    function onNav(label) {
        if (label === 'compose') {
            setCmpType(label)
            return
        }

        const to = label !== 'compose' ? 'list' : 'compose'
        setCmpType(to)
        filterByLabel(label)
    }

    return (<div className="main-folder-list">
        <div onClick={() => onNav('compose')}>
            <img className="icon" src="assets/img/mail/compose.png" />Compose
        </div>
        <div onClick={() => onNav('inbox')} className={"folder" + ('inbox' === selectedFolder ? ' selected-folder' : '')}>
            <img className="icon" src='assets/img/mail/asset 35.png' />inbox
        </div>
        <div onClick={() => onNav('sent')} className={"folder" + ('sent' === selectedFolder ? ' selected-folder' : '')}>
            <img className="icon" src='assets/img/mail/sent.svg' />sent
        </div>
        <div onClick={() => onNav('trash')} className={"folder" + ('trash' === selectedFolder ? ' selected-folder' : '')}>
            <img className="icon" src='assets/img/mail/trash.svg' />trash
        </div>
        <div onClick={() => onNav('draft')} className={"folder" + ('draft' === selectedFolder ? ' selected-folder' : '')}>
            <img className="icon" src='assets/img/mail/draft.png' />draft
        </div>
    </div>)
}

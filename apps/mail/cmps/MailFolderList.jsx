const { useLocation, useNavigate } = ReactRouter

export function MailFolderList({ setCmpType }) {

    function onNav(to) {
        setCmpType(to)
    }
    // Allow filtering by different folders: inbox / sent / trash/ draft

    return (<div className="main-folder-list">
        <div onClick={() => onNav('compose')}>
            <img className="icon" src="assets/img/mail/compose.png" />Compose
        </div>
        <div onClick={() => onNav('list')} className="folder"><img className="icon" src='assets/img/mail/asset 35.png' />inbox</div>
        <div onClick={() => onNav('list')} className="folder"><img className="icon" src='assets/img/mail/sent.svg' />sent</div>
        <div className="folder">trash</div>
        <div className="folder">draft</div>
    </div>)
}

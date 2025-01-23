const { useLocation, useNavigate } = ReactRouter

export function MailFolderList({setCmpType}) {

    function onNavCompose() {
        setCmpType('compose')
    }
    // Allow filtering by different folders: inbox / sent / trash/ draft

    return (<div className="main-folder-list">
        <div onClick={onNavCompose} to='compose'>
            <img className="icon" src="assets/img/mail/compose.png" />Compose
        </div>
        <div className="folder"><img className="icon" src='assets/img/mail/asset 35.png' /> inbox</div>
        <div className="folder">sent</div>
        <div className="folder">trash</div>
        <div className="folder">draft</div>
    </div>)
}

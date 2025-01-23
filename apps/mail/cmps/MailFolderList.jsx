const { useParams, Link } = ReactRouterDOM

export function MailFolderList() {

    // Allow filtering by different folders: inbox / sent / trash/ draft

    return (<div className="main-folder-list">
        <Link to='compose'>
            <img className="icon" src="assets/img/mail/compose.png" />Compose
        </Link>
        <div className="folder"><img className="icon" src='assets/img/mail/asset 35.png' /> inbox</div>
        <div className="folder">sent</div>
        <div className="folder">trash</div>
        <div className="folder">draft</div>
    </div>)
}

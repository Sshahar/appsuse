
export function MailFolderList() {

    // Allow filtering by different folders: inbox / sent / trash/ draft

    return (<div className="main-folder-list">
        <button><img/>Compose</button>
        <div className="folder"><img className="mail-icon" src='apps/mail/assets/img/asset 35.png' /> inbox</div>
        <div className="folder">sent</div>
        <div className="folder">trash</div>
        <div className="folder">draft</div>
    </div>)
}

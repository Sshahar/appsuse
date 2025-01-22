
export function MailFolderList() {
    
    // Allow filtering by different folders: inbox / sent / trash/ draft

    return (<div class="main-folder-list">
        <div className="folder">inbox</div>
        <div className="folder">sent</div>
        <div className="folder">trash</div>
        <div className="folder">draft</div>
    </div>)
}

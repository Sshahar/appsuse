const { useLocation, useNavigate } = ReactRouter
const { useParams, Link } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function MailFolderList({ setCmpType, filterByLabel, selectedFolder, onSetFilter }) {
    function onNav(navTo) {
        const filters = { labels: [navTo] }

        if (navTo === 'starred') {
            filters.labels = ['inbox']
            filters.isStarred = true
        } else {
            filters.isStarred = false
        }
        onSetFilter(filters)

        // "navigate"
        if (navTo !== 'compose') navTo = 'list'
        setCmpType(navTo)
    }

    return (<div className="main-folder-list">
        <div className="compose-container" onClick={() => onNav('compose')}>
            <img className="icon" src="assets/img/mail/compose.png" />Compose
        </div>

        <div onClick={() => onNav('inbox')} className={"folder" + ('inbox' === selectedFolder ? ' selected-folder' : '')}>
            <img className="icon" src='assets/img/mail/asset 35.png' />
            <span>inbox</span>
        </div>
        <div onClick={() => onNav('starred')} className={"folder" + ('starred' === selectedFolder ? ' selected-folder' : '')}>
            <img className="icon" src='assets/img/mail/star-not.png' />
            <span>starred</span>
        </div>
        <div onClick={() => onNav('sent')} className={"folder" + ('sent' === selectedFolder ? ' selected-folder' : '')}>
            <img className="icon" src='assets/img/mail/sent.svg' />
            <span>sent</span>
        </div>
        <div onClick={() => onNav('trash')} className={"folder" + ('trash' === selectedFolder ? ' selected-folder' : '')}>
            <img className="icon" src='assets/img/mail/trash.svg' />
            <span>trash</span>
        </div>
        <div onClick={() => onNav('draft')} className={"folder" + ('draft' === selectedFolder ? ' selected-folder' : '')}>
            <img className="icon" src='assets/img/mail/draft.png' />
            <span>draft</span>
        </div>
    </div>)
}

const { NavLink, useLocation } = ReactRouterDOM

import { globalState } from "../services/globalState.js"

export function FolderList({ currentFolder }) {
    const IMG_PATH = globalState.getImgPath()
    const location = useLocation()

    function _getFolderImgSrc(folder) {
        if (_isSelected(folder)) return `${IMG_PATH}/${folder}-fill.png`
        return `${IMG_PATH}/${folder}.png`
    }

    function _isSelected(folder) {
        return currentFolder === folder
    }

    const folders = ['inbox', 'starred', 'snoozed', 'important', 'sent', 'drafts',]
    const baseUrl = location.pathname + location.hash.split('?')[0]
    return (
        <aside className="mail-folder-list">
            {/* Compose */}
            <NavLink to={baseUrl + "?compose=new"} className="compose"><img className="mail-icon2" src={`${IMG_PATH}/compose.png`} /> Compose</NavLink>
            {/* Folder list */}
            <ul className="clean-list">
                {folders.map(folder => (
                    <li key={folder} className={_isSelected(folder) ? "selected" : ""}>
                        <NavLink to={`#${folder}`}>
                            <img className="icon" src={_getFolderImgSrc(folder)} />
                            <span className="capitalize">{folder}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
            {/* Labels (TODO: add them) */}
        </aside>
    )
}

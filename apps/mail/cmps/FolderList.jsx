const { Link, NavLink, useLocation } = ReactRouterDOM
const { useEffect } = React

import { globalState } from "../services/globalState.js"

export function FolderList() {
    const IMG_PATH = globalState.getImgPath()
    const location = useLocation()

    useEffect(() => {
        console.log('location.hash:', location.hash)
    }, [location.hash])

    const folders = ['inbox', 'starred', 'snoozed', 'important', 'sent', 'drafts',]
    return (
        <aside className="mail-folder-list">
            {/* Compose */}
            <button className="compose"><img className="mail-icon2" src={`${IMG_PATH}/compose.png`} /> Compose</button>
            {/* Folder list */}
            <ul className="clean-list">
                {folders.map(folder => (
                    <li key={folder}>
                        <NavLink to={`#${folder}`}>
                            <img className="icon" src={`${IMG_PATH}/${folder}.png`} />
                            <span className="capitalize">{folder}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
            {/* Labels (TODO: add them) */}
        </aside>
    )
}

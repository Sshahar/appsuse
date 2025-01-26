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
    )
}

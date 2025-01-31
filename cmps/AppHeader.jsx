const { useEffect, useState } = React

const { Link, NavLink, useLocation } = ReactRouterDOM

// Dynamic app header
export function AppHeader() {
    const location = useLocation();
    const [headerType, setHeaderState] = useState()

    useEffect(() => {
        setHeaderState(() => location.pathname.split('/')[1])
    }, [location])
    switch (headerType) {
        default:
            return <MailHeader />
    }
}

function MailHeader() {
    const [areAppsShown, setAreAppsShown] = useState(true) // TODO: change to false by default
    const location = useLocation()
    const [page, setPage] = useState(location.pathname.split('/')[1])

    useEffect(() => {
        setPage(location.pathname.split('/')[1])
        console.log('page:', page)
    }, [location])

    function onToggleApps() {
        setAreAppsShown(prev => !prev)
    }

    const apps = [
        { name: 'book' },
        { name: 'mail' },
        { name: 'note' },
    ]

    const isDefaultPage = !['mail', 'note'].includes(page)

    return (
        <React.Fragment>
            <header className="mail-app-header">
                {page === 'mail' &&
                    <React.Fragment>
                        <div className="group">
                            {/* Hamburger */}
                            <img className="hamburger" src="assets/img/hamburger.svg" />
                            {/* Logo */}
                            <img className="mail-logo" src="apps/mail/assets/img/logo.png" />
                        </div>

                        <div className="group search-group">
                            {/* Search / filter */}
                            <input className="mail-search clickable" type="text" placeholder="Search mail" />
                            <button className="search-options"></button>
                        </div>

                        <div className="group">
                            {/* Apps icons */}
                            <img className="opacity-1 mail-icon2" src="assets/img/settings.svg" />
                            <img onClick={onToggleApps} className="opacity-1 mail-icon2" src="assets/img/apps.svg" />
                            <img className="mail-icon3 circle" src="assets/img/profile.jpeg" />
                        </div>
                    </React.Fragment>
                }
                {page === 'note' &&
                    <React.Fragment>

                        <NoteLogo />
                        <img onClick={onToggleApps} className="right-group opacity-1 mail-icon2" src="assets/img/apps.svg" />
                    </React.Fragment>
                }

                {isDefaultPage &&
                    <React.Fragment>
                        <DefaultLogo />
                        <img onClick={onToggleApps} className="right-group opacity-1 mail-icon2" src="assets/img/apps.svg" />
                    </React.Fragment>
                }

                {/* Apps display window */}
                {areAppsShown &&
                    <div className="apps-window">
                        {apps.map(  a => (
                            <NavLink key={a.name} className="app-link" to={`/${a.name}`}>
                                <img className="icon-4" src={`assets/img/${a.name}.png`} />
                                <span>{a.name}</span>
                            </NavLink>
                        ))}

                    </div>
                }
            </header>


        </React.Fragment>
    )
}

function DefaultLogo() {
    return (<h3 className="default-logo"><img src="assets/img/main-logo.png" alt="" /></h3>)
}

function NoteLogo(props) {
    return (<h3 className="keep-logo"><img src="apps\note\assets\keep.png" /></h3>)
}
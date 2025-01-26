const { Link, NavLink } = ReactRouterDOM
const { useState } = React

// Dynamic app header
export function AppHeader() {
    const [headerType, setHeaderState] = useState('mail')

    switch (headerType) {
        case 'mail':
            return <MailHeader />
        default:
            return <DefaultHeader />
    }
}

function MailHeader() {
    return (
        <React.Fragment>
            <header className="app-header">
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
                    <img className="mail-icon2" src="assets/img/settings.svg" />
                    <img className="mail-icon2" src="assets/img/apps.svg" />
                    <img className="mail-icon3 circle" src="assets/img/profile.jpeg" />
                </div>
            </header>

        </React.Fragment>
    )
}

function DefaultHeader() {
    const [logoType, setLogoType] = useState(getLogoType())

    function getLogoType() {
        const url = window.location.href
        if (url.includes('mail')) return ('mail')
        else if (url.includes('note')) return ('note')
        else return ('default')
    }
    return (
        <header className="app-header">
            <Link to="/">
                <div className="logo-items">
                    <DynamicLogo cmpType={logoType} />
                </div>
            </Link>
            <nav>
                <NavLink to="/" onClick={() => setLogoType('default')}>Home</NavLink>
                <NavLink to="/about" onClick={() => setLogoType('default')}>About</NavLink>
                <NavLink onClick={() => setLogoType('mail')} to="/mail">Mail</NavLink>
                <NavLink onClick={() => setLogoType('note')} to="/note">Note</NavLink>
                <NavLink onClick={() => setLogoType('book')} to="/book">Book</NavLink>
            </nav>
        </header>
    )
}

function DynamicLogo(props) {
    // console.log('props:', props)
    switch (props.cmpType) {

        case 'note':
            return <NoteLogo {...props} />
        case 'mail':
            return <MailLogo {...props} />

        default: return <DefaultLogo {...props} />
    }
}

function DefaultLogo(props) {
    return (<h3><img src="assets/img/main-logo.png" alt="" /></h3>)
}

// TODO: remove when mail header is complete
function MailLogo(props) {
    return (<h3>Gmail!</h3>)
}
function NoteLogo(props) {
    return (<h3 className="keep-logo"><img src="apps\note\assets\keep.png" /></h3>)
}
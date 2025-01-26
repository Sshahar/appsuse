const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function AppHeader() {
    const [logoType, setLogoType] = useState(getLogoType())

    function getLogoType() {
        const url = window.location.href
        if (url.includes('mail')) return ('mail')
        else if (url.includes('note')) return ('note')
        else return ('default')
    }
    return (<header className="app-header">
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
    </header>)
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

function MailLogo(props) {
    return (<h3>Gmail!</h3>)
}
function NoteLogo(props) {
    return (<h3 className="keep-logo"><img src="apps\note\assets\keep.png" /></h3>)
}
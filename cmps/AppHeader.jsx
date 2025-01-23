import { CustomNavLink } from "./CustomNavLink.jsx"

const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function AppHeader() {
    const [logoType, setLogoType] = useState('default')

    return (<header className="app-header">
        <Link to="/">
            <DynamicLogo cmpType={logoType} />
        </Link>
        <nav>
            <NavLink to="/" onClick={() => setLogoType('default')}>Home</NavLink>
            <NavLink to="/about" onClick={() => setLogoType('default')}>About</NavLink>
            <NavLink onClick={() => setLogoType('mail')} to="/mail">Mail</NavLink>
            <NavLink onClick={() => setLogoType('note')} to="/note">Note</NavLink>
        </nav>
    </header>)
}


function DynamicLogo(props) {
    // console.log('props:', props)
    switch (props.cmpType) {
        case 'default':
        case 'note':
            return <DefaultLogo {...props} />
        case 'mail':
            return <MailLogo {...props} />
    }
}

function DefaultLogo(props) {
    return (<h3><img src="assets/img/main-logo.png" alt="" /></h3>)
}

function MailLogo(props) {
    return (<h3><img src="assets/img/mail/logo.png" /></h3>)
}
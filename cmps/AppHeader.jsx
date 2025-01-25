import { CustomNavLink } from "./CustomNavLink.jsx"

const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect, useRef } = React

export function AppHeader() {
    const [logoType, setLogoType] = useState(getLogoType())
    
    function getLogoType(){
        const url = window.location.href
        if(url.includes('mail')) return('mail')
        else if (url.includes('note')) return('note')
        else return('default')
    }
    return (<header className="app-header">
        <div className="logo-items">
        <svg className="icon" focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
        <Link to="/">
            <DynamicLogo cmpType={logoType} />
        </Link>
        </div>
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

        default: return <DefaultLogo {...props}/>
    }
}

function DefaultLogo(props) {
    return (<h3><img src="assets/img/main-logo.png" alt="" /></h3>)
}

function MailLogo(props) {
    return (<h3><img src="assets/img/mail/logo.png" /></h3>)
}
function NoteLogo(props){
    return (<h3 className="keep-logo"><img src="apps\note\assets\keep.png" /></h3>)
}
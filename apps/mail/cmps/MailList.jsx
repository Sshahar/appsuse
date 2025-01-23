import { MailPreview } from "./MailPreview.jsx"

// export function MailList({mails, setCmpType}) {
    export function MailList(props) {
    console.log('props:', props)
    return (
        <React.Fragment>
            {props.mails.map(mail => (
                <MailPreview key={mail.id} mail={mail} setCmpType={props.setCmpType}/>
            ))
            }
        </React.Fragment>
    )
}

import { MailPreview } from "./MailPreview.jsx"

export function MailList({mails, setCmpType}) {

    return (
        <React.Fragment>
            <div>Mail list</div>
            {mails.map(mail => (
                <MailPreview key={mail.id} mail={mail} setCmpType={setCmpType}/>
            ))
            }
        </React.Fragment>
    )
}

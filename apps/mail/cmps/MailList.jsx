import { MailPreview } from "./MailPreview.jsx"
const { useState, useEffect, useRef } = React

export function MailList({ mails, setCmpType }) {

    return (
        <React.Fragment>
            {mails.map(mail => (
                <MailPreview key={mail.id} mail={mail} setCmpType={setCmpType} />
            ))
            }
        </React.Fragment>
    )
}

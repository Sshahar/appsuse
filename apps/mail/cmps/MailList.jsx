import { MailCompose } from "./MailCompose.jsx"
import { MailPreview } from "./MailPreview.jsx"
const { useState, useEffect, useRef } = React

export function MailList({ mails, setCmpType, deleteMail, sortBy, setMailRead, sendMail, cmpType }) {

    function getSortedMails() {
        switch (sortBy.by) {
            case 'sentAt':
                return [...mails].sort((m1, m2) => (m1.sentAt - m2.sentAt) * sortBy.direction)
        }
        return mails
    }

    const sortedMails = getSortedMails()
    return (
        <React.Fragment>
            {sortedMails.map(mail => (
                <MailPreview key={mail.id} mail={mail} setCmpType={setCmpType} deleteMail={deleteMail} setMailRead={setMailRead} />
            ))
            }
            {cmpType === 'compose' &&
                <MailCompose sendMail={sendMail} />}
        </React.Fragment>
    )
}

import { MailCompose } from "./MailCompose.jsx"
import { MailPreview } from "./MailPreview.jsx"
const { useState, useEffect, useRef } = React

export function MailList({ mails, setCmpType, deleteMail, sortBy, setMailRead, sendMail, cmpType, onUpdateMail }) {

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
            <div className='mail-list'>
                {sortedMails.map(mail => (
                    <MailPreview key={mail.id} mail={mail} setCmpType={setCmpType} deleteMail={deleteMail} setMailRead={setMailRead}
                        onUpdateMail={onUpdateMail} />
                ))
                }
            </div>

            {cmpType === 'compose' &&
                <MailCompose sendMail={sendMail} />}
        </React.Fragment>
    )
}

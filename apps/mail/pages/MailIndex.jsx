import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"

const { useState, useEffect, useRef } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [cmpType, setCmpType] = useState('list')
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        console.log('filterBy:', filterBy)
        mailService.query(filterBy).then(setMails)
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function onSendMail(mail) {
        console.log('hello')
        console.log('mail:', mail)
        mail.from = mailService.getLoggedinUser().email
        mailService.save(mail)
    }

    return (
        <div className="main-mail-index">
            <MailFolderList setCmpType={setCmpType} />
            <DynamicCmp cmpType={cmpType} mails={mails} setCmpType={setCmpType} mainStyle={{'gridColumn': 2}} sendMail={onSendMail}/>
        </div>
    )
}

function DynamicCmp(props) {
    // console.log('props:', props)
    switch (props.cmpType) {
        case 'list':
            return <MailList {...props} />
        case 'details':
            return <MailDetails {...props} />
        case 'compose':
            return <MailCompose {...props} />
    }
}
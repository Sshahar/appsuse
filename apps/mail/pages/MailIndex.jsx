import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"
import { getTruthyValues } from "../services/util.service.js"

const { useState, useEffect, useRef } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [cmpType, setCmpType] = useState('list')
    const [sortBy, setSortBy] = useState({ by: 'sentAt', direction: -1 })
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy)) // {txt:'aba'}
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('Problems getting mails:', err)
            })
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function onSendMail(mail) {
        mail.from = mailService.getLoggedinUser().email
        mailService.save(mail)
    }

    // TODO: switch to useContext
    function onDeleteMail(mailId) {
        mailService.remove(mailId)
            .then(setMails(prevMails => prevMails.filter(mail => mail.id !== mailId)))
            .catch(err => console.log('err', err))
    }

    function filterByLabel(label) {
        // TODO: implement function
        const labels = [label]
        setFilterBy((prevFilter) => ({ ...prevFilter, labels }))
    }

    function getSelectedFolder() {
        const labels = filterBy.labels
        if (labels.includes('inbox')) return 'inbox'
        if (labels.includes('sent')) return 'sent'
        if (labels.includes('trash')) return 'trash'
        if (labels.includes('draft')) return 'draft'
    }
    
    function onSetMailRead(mail) {
        mail.isRead = true
        mailService.save(mail)
    }

    function onSetCmpType(newCmpType) {
        setCmpType(newCmpType)
    }

    return (
        <div className="main-mail-index">
            <MailFolderList
                labels={filterBy.labels}
                setCmpType={onSetCmpType}
                initSelectedFolder={getSelectedFolder()}
                filterByLabel={filterByLabel} />

            <DynamicCmp
                cmpType={cmpType}
                mails={mails}
                setCmpType={onSetCmpType}
                mainStyle={{ 'gridColumn': 2 }}
                sendMail={onSendMail}
                deleteMail={onDeleteMail}
                sortBy={sortBy}
                // Mail list context
                setMailRead={onSetMailRead}
            />
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
            return <MailList {...props} />
    }
}
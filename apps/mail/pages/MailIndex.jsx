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

    console.log('cmpType:', cmpType)
    return (
        <div className='books-container'>
            <h2>Mail app</h2>
            <DynamicCmp cmpType={cmpType} mails={mails} setCmpType={setCmpType}/>
            {/* <MailList mails={mails} /> */}
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
    }
}
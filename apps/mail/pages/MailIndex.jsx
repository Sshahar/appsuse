const { useState, useEffect } = React
const { useLocation, useNavigate } = ReactRouterDOM

import { showUserMsg } from '../../../services/event-bus.service.js'
import { FolderList } from "../cmps/FolderList.jsx"
import { LabelsHeader } from "../cmps/LabelsHeader.jsx"
import { PaginationHeader } from "../cmps/PaginationHeader.jsx"
import { PreviewList } from "../cmps/PreviewList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const location = useLocation()
    const navigate = useNavigate()
    const [mails, setMails] = useState([])
    const [folder, setFolder] = useState('')
    const [filter, setFilter] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        if (!folder) navigate("#inbox")
        $('body').addClass('mail')

        return () => {
            $('body').removeClass('mail')
        }
    }, [])

    useEffect(() => {
        loadMails()
    }, [filter])

    useEffect(() => {
        setFolder(location.hash.split('?')[0].slice(1))
    }, [location])

    useEffect(() => {
        setFilter(prevFilter => ({ ...prevFilter, folder }))
    }, [folder])

    function loadMails() {
        console.log('Getting mails from server...')
        mailService.query(filter)
            .then(mails => {
                mails = mailService.sort(mails)
                setMails(mails)

                // console.log('Mails loaded successfuly ')
            })
            .catch(err => {
                // console.log('Couldn\'t load mails:', err)
            })
    }

    function onSetLabel(label) {
        // console.log('Setting label:', label)
        setFilter(prevFilter => ({ ...prevFilter, label }))
    }

    function sendMail(mailToAdd, isDraft) {
        showUserMsg("Sending...")

        // TODO: on empty subject & body - prompt user "are you sure"

        mailService.save(mailToAdd)
            .then(savedMail => {
                showUserMsg("Message sent")
            })
            .catch(err => {
                showUserMsg("Connection error")
            })

        navigate(location.pathname + location.hash.split('?')[0])
    }


    function _isCompose() {
        return location.hash.split('?')[1] && location.hash.split('?')[1].startsWith('compose')
    }

    return (
        <section className="mail-index">
            {/* Aside */}
            <FolderList currentFolder={folder} />

            {/* Main */}
            <main>
                {/* Pagination header */}
                <PaginationHeader />
                {/* Labels header */}
                {(folder === 'inbox') && <LabelsHeader currentLabel={filter.label} onSetLabel={onSetLabel} />}

                {/* Preview list */}
                <PreviewList mails={mails} />
            </main>

            {/* Compose  */}
            {_isCompose() && <MailCompose sendMail={sendMail} />}
        </section>
    )
}
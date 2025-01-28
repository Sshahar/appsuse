const { useState, useEffect } = React
const { useLocation, useNavigate } = ReactRouterDOM

import { showUserMsg } from '../../../services/event-bus.service.js'
import { FolderList } from "../cmps/FolderList.jsx"
import { LabelsHeader } from "../cmps/LabelsHeader.jsx"
import { PaginationHeader } from "../cmps/PaginationHeader.jsx"
import { PreviewList } from "../cmps/PreviewList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from '../cmps/MailDetails.jsx'

export function MailIndex() {
    const location = useLocation()
    const navigate = useNavigate()
    const [page, setPage] = useState('preview') // 'preview' \ 'details'
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

    function onChangeMail(mail) {
        mailService.save(mail)
            .then(savedMail => {
                const updateIdx = mails.findIndex(m => m.id === savedMail.id)
                setMails(prevMails => {
                    prevMails[updateIdx] = savedMail
                    return [...prevMails]
                })
            })
            .catch(err => {
                showUserMsg('Connection error')
            })
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

            {/* Preview Page */}
            {page === 'preview' && <main>
                {/* Pagination header */}
                <PaginationHeader />
                {/* Labels header */}
                {(folder === 'inbox') && <LabelsHeader currentLabel={filter.label} onSetLabel={onSetLabel} />}

                {/* Preview list */}
                <PreviewList mails={mails} onChangeMail={onChangeMail} />
            </main>}

            {/* Details Page */}
            {page === 'details' && <main>
                {/* Pagination header */}
                <PaginationHeader />
                {/* Labels header */}
                {(folder === 'inbox') && <LabelsHeader currentLabel={filter.label} onSetLabel={onSetLabel} />}

                {/* Mail Details */}
                <MailDetails />
            </main>}

            {/* Compose  */}
            {_isCompose() && <MailCompose sendMail={sendMail} />}
        </section>
    )
}
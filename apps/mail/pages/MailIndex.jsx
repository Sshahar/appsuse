const { useState, useEffect } = React
const { useLocation, useNavigate, useParams } = ReactRouterDOM

import { showInfoMsg } from '../../../services/event-bus.service.js'
import { FolderList } from "../cmps/FolderList.jsx"
import { LabelsHeader } from "../cmps/LabelsHeader.jsx"
import { DetailsPaginationHeader, PaginationHeader } from "../cmps/PaginationHeader.jsx"
import { PreviewList } from "../cmps/PreviewList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from '../cmps/MailDetails.jsx'

export function MailIndex() {
    const location = useLocation()
    const navigate = useNavigate()
    const { mailId } = useParams()
    const [page, setPage] = useState('preview')
    const [mails, setMails] = useState([])
    const [folder, setFolder] = useState('')
    const [filter, setFilter] = useState(mailService.getDefaultFilter())
    const [mailTypeCounts, setMailTypeCounts] = useState({ inbox: '', drafts: '' })

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

    useEffect(() => {
        mailService.getMailTypeCounts().then(counts => setMailTypeCounts(counts))
    }, [mails])

    useEffect(() => {
        if (!mailId) setPage('preview')
        else setPage('details')
    }, [mailId])

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
                showInfoMsg('Connection error')
            })
    }

    function sendMail(mailToAdd, isDraft) {
        showInfoMsg("Sending...")

        // TODO: on empty subject & body - prompt user "are you sure"

        mailService.save(mailToAdd)
            .then(savedMail => {
                showInfoMsg("Message sent")
            })
            .catch(err => {
                showInfoMsg("Connection error")
            })

        navigate(location.pathname + location.hash.split('?')[0])
    }

    function onDeleteMail(mailIdToDelete) {
        if (!mailIdToDelete) mailIdToDelete = mailId

        mailService.remove(mailIdToDelete)
        .then(() => {
            showInfoMsg('Mail deleted')
            navigate('/mail' + location.hash.split('?')[0])
            setMails(prevMails => prevMails.filter(m => m.id !== mailIdToDelete))
        })
        .catch(err => {
            console.log('MailIndex -> onDeleteMail err:', err)
            showInfoMsg('Cannot delete mail')
        })
    }

    function _isCompose() {
        return location.hash.split('?')[1] && location.hash.split('?')[1].startsWith('compose')
    }

    const mainPageCss = page === 'preview' ? 'mail-preview' : 'mail-details'
    return (
        <section className="mail-index">
            {/* Aside */}
            <FolderList mailTypeCounts={mailTypeCounts} currentFolder={folder} />

            {page === 'preview' &&
                <React.Fragment>

                    <main>
                        {/* Pagination header */}
                        < PaginationHeader />
                        {/* Preview Page */}

                        {/* Labels header */}
                        {(folder === 'inbox') && <LabelsHeader currentLabel={filter.label} onSetLabel={onSetLabel} />}

                        {/* Preview list */}
                        <PreviewList className={mainPageCss} mails={mails} onChangeMail={onChangeMail} />
                    </main>
                </React.Fragment>
            }
            {/* Details Page */}
            {page === 'details' &&
                <main className={mainPageCss}>
                    <React.Fragment>

                        {/* Pagination header */}
                        <DetailsPaginationHeader onDeleteMail={onDeleteMail} />

                        {/* Mail Details */}
                        <MailDetails />
                    </React.Fragment>
                </main>
            }



            {/* Compose  */}
            {_isCompose() && <MailCompose sendMail={sendMail} />}
        </section >
    )
}
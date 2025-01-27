const { useState, useEffect } = React
const { useLocation, useNavigate } = ReactRouterDOM

import { FolderList } from "../cmps/FolderList.jsx"
import { LabelsHeader } from "../cmps/LabelsHeader.jsx"
import { PaginationHeader } from "../cmps/PaginationHeader.jsx"
import { PreviewList } from "../cmps/PreviewList.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {
    const location = useLocation()
    const navigate = useNavigate()
    const [mails, setMails] = useState([])
    const [page, setPage] = useState(location.hash.split('?')[0])
    const [filter, setFilter] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        if (!page) navigate("#inbox")
    }, [])

    useEffect(() => {
        loadMails()
    }, [filter])

    function loadMails() {
        console.log('Getting mails from server...')
        mailService.query()
            .then(mails => {
                setMails(mails)

                console.log('Mails loaded successfuly ')
            })
            .catch(err => {
                console.log('Couldn\'t load mails:', err)
            })
    }
    return (
        <section className="mail-index">
            {/* Aside */}
            <FolderList />

            {/* Main */}
            <main>
                {/* Pagination header */}
                <PaginationHeader />
                {/* Labels header */}
                <LabelsHeader />

                {/* Preview list */}
                <PreviewList />
            </main>
        </section>
    )
}
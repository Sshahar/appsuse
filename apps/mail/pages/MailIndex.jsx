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

    useEffect(() => {
        if (!page) navigate("#inbox")

        console.log('Getting mails from server...')
        mailService.query()
            .then(mails => {
                setMails(mails)

                // TODO: display success message

            })
            .catch(err => {
                console.log('error fetching mails:', err)

                // TODO: display error message
            })
    }, [])

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
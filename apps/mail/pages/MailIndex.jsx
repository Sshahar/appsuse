import { FolderList } from "../cmps/FolderList.jsx"
import { LabelsHeader } from "../cmps/LabelsHeader.jsx"
import { PaginationHeader } from "../cmps/PaginationHeader.jsx"
import { PreviewList } from "../cmps/PreviewList.jsx"

export function MailIndex() {
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
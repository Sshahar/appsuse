const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { BookIndex } from "./apps/book/pages/BookIndex.jsx"
import { BookDetails } from "./apps/book/pages/BookDetails.jsx"
import { BookAdd } from "./apps/book/cmps/BookAdd.jsx"
import { Dashboard } from "./apps/book/pages/Dashboard.jsx"
import { MailDetails } from "./apps/mail/cmps/MailDetails.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* Mail app */}
                <Route path="/mail" element={<MailIndex />}/>
                <Route path="/mail/:mailId" element={<MailIndex />}/>
                

                {/* Note app */}
                <Route path="/note" element={<NoteIndex />} />

                {/* Book app */}
                <Route path='book' element={<BookIndex />} />
                <Route path='book/:bookId' element={<BookDetails />} />
                <Route path='add/book' element={<BookAdd />} />
                <Route path='book/dashboard' element={<Dashboard />} />
            </Routes>
        </section>
        <UserMsg />
    </Router>
}

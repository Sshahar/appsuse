const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"
import { MailCompose } from "./apps/mail/cmps/MailCompose.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* TODO: learn how to use nested routes (history won't work, render won't work) */}
                <Route path="/mail" element={<MailIndex />}>
                    <Route path="/mail/compose" element={<MailCompose />} />
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                </Route>

                <Route path="/note" element={<NoteIndex />} />
            </Routes>
        </section>
    </Router>
}

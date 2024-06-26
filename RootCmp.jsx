const Router = ReactRouterDOM.HashRouter
const { Route, Routes, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { AboutTeam } from "./cmps/AboutTeam.jsx"
import { AboutGoal } from "./cmps/AboutGoal.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { BookAdd } from "./pages/BookAdd.jsx"
import { Dashboard } from "./pages/Dashboard.jsx"

export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} >
                            <Route path="/about/team" element={<AboutTeam />} />
                            <Route path="/about/goal" element={<AboutGoal />} />
                        </Route>
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/add" element={<BookAdd />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router >
    )
}
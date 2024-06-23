import { About } from "./pages/About.jsx"
import { Books } from "./pages/books.jsx"

const { useState } = React

export function App() {
    const [page, setPage] = useState('books')

    return (
        <section className="app">
            <header className="app-header">
                <h1>Miss Books</h1>
                <div className="nav-links">
                    <a onClick={() => setPage('home')} href="#">Home</a>
                    <a onClick={() => setPage('about')} href="#">About</a>
                    <a onClick={() => setPage('books')} href="#">Books</a>
                </div>
            </header>

            <main className="main-layout">
                {/* {page === 'home' && <Home />} */}
                {page === 'about' && <About />}
                {page === 'books' && <Books />}
            </main>

        </section>
    )
}
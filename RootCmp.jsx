import { Home } from './cmps/Home.jsx'

export function App() {
    return (
        <section className="app">
            <header className="app-header">
                <h1>My App</h1>
            </header>
            <main class="container">
                <Home />
            </main>
        </section>
    )
}
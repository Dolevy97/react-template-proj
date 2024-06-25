const { Link, NavLink, useNavigate } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header">
            <h1>Miss Books</h1>
            <nav className="nav-links">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </header>
    )
}
export function BookPreview({ book }) {
    
    return (
        <div className="book-container">
            <p>{book.title}</p>
            <img className="book-thumbnail" src={book.thumbnail}></img>
        </div>
    )
}
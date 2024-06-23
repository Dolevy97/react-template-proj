export function BookPreview({ book }) {
    
    return (
        <div className="book-container">
            <img className="book-thumbnail" src={book.thumbnail} title={book.title}></img>
        </div>
    )
}
const { useParams, Link } = ReactRouterDOM


export function AddReview({ onAddReview }) {
    const { bookId } = useParams()

    return (
        <section>
            <form onSubmit={onAddReview} className="add-review-form">
                <input name="fullName" type="text" placeholder="Enter your full name" />
                <select name="rating">
                    <option value="0">Choose your rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <div className="read">
                    <label htmlFor="readAt">Read at: </label>
                    <input type="date" name="readAt" id="readAt" />
                </div>
                <button>Add your review</button>
            </form>
        </section>
    )
}
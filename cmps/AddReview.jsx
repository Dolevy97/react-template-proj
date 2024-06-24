import { bookService } from "../services/book.service.js"

const { useState } = React

const { useParams, Link } = ReactRouterDOM


export function AddReview({ onAddReview }) {
    const [review, setReview] = useState(bookService.getEmptyReview)

    const { bookId } = useParams()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;

            case 'radio':
                value = target.id
                break;
            case 'select':
                value = target.selected
            default:
                break;
        }
        setReview(review => ({ ...review, [field]: value }))
    }

    return (
        <section>
            <form onSubmit={() => onAddReview(event, review)} className="add-review-form">
                <input onChange={handleChange} name="fullName" type="text" placeholder="Enter your full name" />
                <select onChange={handleChange} name="rating">
                    <option value="0">Choose your rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <div className="read">
                    <label htmlFor="readAt">Read at: </label>
                    <input onChange={handleChange} type="date" name="readAt" id="readAt" />
                </div>
                <button type="submit">Add your review</button>
            </form>
        </section>
    )
}

const { useNavigate, useParams } = ReactRouterDOM

const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"


export function BookEdit() {

    function onSaveBook(ev) {
        ev.preventDefault()
        // Add book logic

        // onCloseModal()
    }

    return (
        <h1>Test</h1>
    )
}
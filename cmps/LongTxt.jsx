const { useState } = React

export function LongTxt({ txt }, { length = 100 }) {
    const [isShowingMore, setIsShowingMore] = useState(false)

    function getShortTxt() {
        if (txt.length > length) {
            return txt.slice(0, length)
        }
        else {
            return txt
        }
    }

    function showMore({ target }) {
        setIsShowingMore(prevIsShowing => !prevIsShowing)
    }

    return (
        <div className="long-txt">
            {getShortTxt()} {txt.length > length && !isShowingMore && <span onClick={showMore} className="show-more">Show more..</span>}
            {isShowingMore && txt}
            {isShowingMore && <span onClick={showMore} className="show-more">Show less..</span>}
        </div>
    )
}
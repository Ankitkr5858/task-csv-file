import React from 'react';
import './Paginator.scss';

function Paginator(props) {
    const {onPageSelect, currentPage, pages} = props

    function onClick(e, page) {
        e.preventDefault()
        onPageSelect(page);
    }

    return (
        <div className='dotsSpan'>
            {[...Array(pages).keys()].map(page => {
                return <span key={`page-${page}`}
                             onClick={(e) => onClick(e, page)}
                             className={`dot ${currentPage === page ? 'active' : ''}`}/>
            })}
        </div>
    );
}

export default Paginator;

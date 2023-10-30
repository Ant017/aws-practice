import './pagination.scss'
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    return (
        <div className='page-container'>
            <BiLeftArrow
            style={{fontSize:"24px"}}
                // icon={faCircleArrowLeft}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            />
            {pageNumbers.map((pageNumber) => (
                <span
                    key={pageNumber}
                    className={pageNumber === currentPage ? 'active' : ''}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </span>
            ))}
            <BiRightArrow
                // icon={faCircleArrowRight}
                style={{fontSize:"24px"}}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            />
        </div>
    )
}

export default Pagination
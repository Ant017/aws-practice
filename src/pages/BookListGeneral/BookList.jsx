import React, { useState } from 'react'
import UserCard from '../../components/UserCard/UserCard'
import '../AllBooksList/AllBooksList.scss'
import SearchBar from '../../components/searchBar/searchBar'
import Pagination from '../../components/pagination/pagination'
import BookModal from '../../components/modalComponent/bookModal'
import Dropdown from '../../components/dropdown/dropdown'
import useBookHook from '../../hooks/useBookHook'
import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import PriceRangeSlider from '../../components/Slider/Slider'

function BookList() {

    const { noBooksFound, fetchedData, currentPage, totalPages, fetchBooks, searchQuery, handleSearchQuery, sortOptionLabels, orderOptionLabels,
        handleSortChange, handleOrderChange, orderOptions, sortOptions, selectedSortOption, selectedOrderOption,
        priceRange, handlePriceChange } = useBookHook();

    // modal
    const [showBookModal, setShowBookModal] = useState(false)
    const [relatedBook, setRelatedBook] = useState([])




    //show or hide the modal
    const updateModal = () => {
        setShowBookModal(!showBookModal)
    }

    return (
        <div className='container'>
            <Header />
            {/* modal */}
            {showBookModal && <BookModal updateModal={updateModal} relatedBook={relatedBook} />}
            {/* searching */}
            <div className='search-book'>

                <SearchBar type='text'
                    placeholder='Search by title, author, or genre...'
                    value={searchQuery}
                    onChange={handleSearchQuery} />
                <div className='dropdown'>
                <PriceRangeSlider priceRange={priceRange} setPriceRange={handlePriceChange} />

                    <Dropdown title="Sort by"
                        labels={[...sortOptionLabels]}
                        options={sortOptions}
                        selectedOption={selectedSortOption}
                        onChange={handleSortChange} />
                    <Dropdown title="Order by"
                        labels={[...orderOptionLabels]}
                        options={orderOptions}
                        selectedOption={selectedOrderOption}
                        onChange={handleOrderChange} />
                </div>
            </div>
            {/* card and modal */}
            {noBooksFound ? (
                <div className="no-books-found-message">No books found</div>
            ) : (
                fetchedData && <UserCard data={fetchedData} updateModal={updateModal} setRelatedBook={setRelatedBook} />
            )}
            {/* pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={fetchBooks} />
            <Footer />
        </div>
    )
}

export default BookList

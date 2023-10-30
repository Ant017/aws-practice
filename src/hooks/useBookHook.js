import { useEffect, useState } from 'react'
import { axiosInstance } from '.././utils/axiosInstance'
import swal from 'sweetalert'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
// import axios from 'axios'

const useBookHook = () => {
    const { filepath } = useParams()
    /* FUNCTIONALITY FOR FETCHING ALL BOOKS */
    const [update, setUpdate] = useState(false)
    //fetch data from api
    const [fetchedData, setFetchedData] = useState([])
    const [noBooksFound, setNoBooksFound] = useState(false);

    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    //search
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearchQuery = (e) => {
        setSearchQuery(e.target.value)
    }

    //sorting (select option)
    const [selectedSortOption, setSelectedSortOption] = useState('');
    const [selectedOrderOption, setSelectedOrderOption] = useState('');

    const handleSortChange = (e) => {

        setSelectedSortOption(e.target.value);
    };
    const handleOrderChange = (e) => {
        setSelectedOrderOption(e.target.value);
    };

    const sortOptions = [
        { value: '', label: '' },
        { value: 'price', label: 'Price' },
        { value: 'rating', label: 'Rating' },
    ];

    const orderOptions = [
        { value: '', label: '' },
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' },
    ];
    const sortOptionLabels = sortOptions.map((option) => option.label);
    const orderOptionLabels = orderOptions.map((option) => option.label);

    //filter
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

    const handlePriceChange = (value) => {
        setPriceRange(value);
        // debouncedFetchBooks(currentPage);
    };

    const fetchBooks = (page) => {
        // Fetch data from API
        axiosInstance
            .get(`/book/get-all-books?page=${page}&limit=6&sortParam=${selectedSortOption}&sortOrder=${selectedOrderOption}&priceMin=${priceRange.min}&priceMax=${priceRange.max}&search=${searchQuery}`)
            .then((response) => response.data)
            .then((data) => {
                // Check if there are no books found
                if (data.data.totalRecords === 0) {
                    setNoBooksFound(true);
                } else {
                    setNoBooksFound(false);
                    setTotalPages(Math.ceil(data.data.totalRecords / 6));
                    setCurrentPage(page);
                    setFetchedData(data)
                }

            })
            .catch((error) => {
                swal(error.response.data.message);
                // Handle other errors (network error, timeout, etc.) here.
                console.error("Other Error:", error);
            })
    }

    // useEffect(() => {
    //     console.log("update")
    //     fetchBooks(currentPage)
    // }, [update])

    useEffect(() => {
        const timeOutFunc = setTimeout(() => {
            console.log("changed")
            fetchBooks(currentPage)
        }, 2000);

        return () => clearTimeout(timeOutFunc);
    }, [currentPage, searchQuery, selectedSortOption, selectedOrderOption, priceRange]);

    /* FUNCTIONALITY FOR ADDING BOOKS */

    //set the form data
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: [],
        description: '',
        pages: null,
        price: null,
        stock: null,
        branch: []
    })



    const handleAddBook = (formData) => {
        // Make a POST request to your API endpoint
        axiosInstance
            .post('/book/add-book', formData)
            .then((response) => {
                if (response.status !== 200) {
                    alert("Something went wrong.")
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.data
            })
            .then((data) => {
                toast.success("Book Added Successfully!")
                console.log('Book added successfully:', data);
            })
            .catch((error) => {
                toast.error('Error adding book:', error)
                console.error('Error adding book:', error);
            });
    };

    const onChangeHandler = (e) => {
        // getting name and value pair from frontend
        const { name, value } = e.target
        // For other input fields, set the value directly into the formData object
        setFormData({ ...formData, [name]: value });
    }

    const refetchBooks = (currentPage) => {
        // const timeOutFunc = setTimeout(() => {
        console.log("refetch")
        fetchBooks(currentPage);
        // }, 3000);
        // return () => clearTimeout(timeOutFunc);
    };

    useEffect(() => {
        refetchBooks(currentPage)
    }, [update, currentPage])

    return {
        // for fetching
        noBooksFound, fetchedData, setFetchedData, fetchBooks,
        currentPage, totalPages,
        searchQuery, handleSearchQuery,
        sortOptionLabels, orderOptionLabels, handleSortChange, handleOrderChange,
        orderOptions, sortOptions, selectedSortOption, selectedOrderOption,
        // for adding book
        formData, onChangeHandler, refetchBooks, handleAddBook,
        priceRange, handlePriceChange, setUpdate, update
    }
}

export default useBookHook;
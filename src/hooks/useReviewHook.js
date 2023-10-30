import { axiosInstance, axiosInstanceToken } from '.././utils/axiosInstance'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookToCart, clearCart } from '../redux/Slices/CartSlice';
import { useNavigate } from 'react-router-dom';

const useReviewHook = () => {
    const user = useSelector((state) => state.user);
    const [fetchedReview, setFetchedReview] = useState([]);
    const checkString = localStorage.getItem("user");
    const check = JSON.parse(checkString)
    const dispatch = useDispatch();

    const addReview = async (book, rating, text) => {
        try {
            console.log("booook", book)
            console.log("readear", user.reader)
            const response = await axiosInstanceToken.post('/review/add-review', {
                book: book,
                reader: user.reader,
                rating: rating,
                text: text
            },
                {
                    headers: {
                        'Authorization': `Bearer ${check.token}`,
                        'Content-Type': 'application/json',
                    },
                });

            if (response.status === 200) {

                alert("Successfully added the review!");
                console.log('Successfully added the review!', response.data);
            } else {
                alert("Something went wrong.");
                console.error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            alert('Error adding review');
            console.error('Error adding review:', error);
        }
    }

    const fetchReview = async () => {
        // Fetch data from API with custom headers
        await axiosInstanceToken
            .get("/review/show-review", {
                headers: {
                    'Authorization': `Bearer ${check.token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                // console.log(response.data.data)
                setFetchedReview(response.data.data)
                // console.log(fetchedReview)
            })
            .catch((error) => {
                // Handle other errors (network error, timeout, etc.) here.
                console.error("Other Error:", error);
            })
    };

    const editReview = async (book, rating, text) => {
        try {
            const response = await axiosInstanceToken.put('/review/update-review', {
                book: book,
                rating: rating,
                text: text
            },
                {
                    headers: {
                        'Authorization': `Bearer ${check.token}`,
                        'Content-Type': 'application/json',
                    },
                });

            if (response.status === 200) {

                swal(response.data.message);
                console.log('Successfully added the review!', response.data);
            } else {
                alert("Something went wrong.");
                console.error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            alert('Error adding review');
            console.error('Error adding review:', error);
        }
    }

    const fetchReviewApi=()=>{
        fetchReview()
    }

    useEffect(() => {
        fetchReview()
    }, [])

    return { addReview, fetchedReview, editReview, fetchReviewApi }
}

export default useReviewHook
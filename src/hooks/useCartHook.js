import { axiosInstance, axiosInstanceToken } from '.././utils/axiosInstance'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookToCart, clearCart } from '../redux/Slices/CartSlice';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const useCartHook = () => {
    const user = useSelector((state) => state.user);
    const checkString = localStorage.getItem("user");
    const check = JSON.parse(checkString)
    const dispatch = useDispatch();

    const handleAddToCart = async (bought_books) => {
        console.log("user id", user.reader);
        console.log("bought_books from hook", bought_books);

        try {
            const response = await axiosInstanceToken.post('/cart/add-to-cart', {
                reader: user.reader,
                bought_books,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${check.token}`,
                        'Content-Type': 'application/json',
                    },
                });

            if (response.status === 200) {
                dispatch(clearCart());

                swal("Successfully added to cart!");
                console.log('Successfully added to cart!', response.data);
            } else {
                // Handle non-200 status code here if necessary
                alert("Something went wrong.");
                console.error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            swal(error.response.data.message)
            console.error('Error adding to cart:', error);
        }
    };

    const [fetchedCart, setFetchedCart] = useState([]);
    const fetchedCartApi = async () => {
        // Fetch data from API with custom headers
        await axiosInstanceToken
            .get("/cart/show-my-cart", {
                headers: {
                    'Authorization': `Bearer ${check.token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response.data.data)
                setFetchedCart(response.data.data)
            })
            .catch((error) => {
                // Handle other errors (network error, timeout, etc.) here.
                console.error("Other Error:", error);
            })
    };

    const handleDeleteFromCart = async (bought_books) => {
        try {
            const response = await axiosInstanceToken.patch('/cart/delete-from-cart', {
                reader: user.reader,
                bought_books,
            },
                {
                    headers: {
                        'Authorization': `Bearer ${check.token}`,
                        'Content-Type': 'application/json',
                    },
                });

            if (response.status === 200) {
                dispatch(clearCart());

                swal("Successfully removed from cart!");
                console.log('Successfully removed from cart!', response.data);
            } else {
                // Handle non-200 status code here if necessary
                alert("Something went wrong.");
                console.error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            swal(error.response.data.message)
            console.error('Error removing from cart:', error);
        }
    }

    const handleCheckout = async (cartId) => {
        try {
            const response = await axiosInstanceToken.post('/cart/checkout', {
                cart: cartId
            },
                {
                    headers: {
                        'Authorization': `Bearer ${check.token}`,
                        'Content-Type': 'application/json',
                    },
                });

            if (response.status === 200) {

                swal("Successfully checked out from cart!");
                console.log('Successfully checked out from cart!', response.data);
            } else {
                alert("Something went wrong.");
                console.error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            swal(error.response.data.message)
            console.error('Error checked out from cart:', error);
        }
    }

    useEffect(() => {
        fetchedCartApi();
    }, []);

    return { handleAddToCart, handleDeleteFromCart, fetchedCart, handleCheckout };
};

export default useCartHook;

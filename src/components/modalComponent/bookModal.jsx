import './bookModal.scss'
import Button from '../button/button'
import RatingStar from '../../utils/RatingStars';
// import { addToCart } from '../../redux/Slices/UserSlice'
import { useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import useCartHook from '../../hooks/useCartHook';
import { addBookToCart } from '../../redux/Slices/CartSlice';

export default function BookModal({ updateModal, relatedBook }) {

    const checkString = localStorage.getItem("user");
    const check = JSON.parse(checkString)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genre_ = relatedBook.genre.join(", ");
    const { handleAddToCart } = useCartHook();

    const submitAddToCart = () => {
        if (!relatedBook._id) {
            console.log("book id null")
            return;
        }

        const bought_books = {
            id: relatedBook._id,
            amount: 1
        }
        dispatch(addBookToCart(relatedBook))
        // console.log(bought_books)
        handleAddToCart(bought_books)
    };

    return (
        <div className='bookModal-container'>
            <div className='bookModal-item'>
                <i className="fa-solid fa-x" onClick={updateModal}></i>
                <div className='modal-overlay'>
                    <div className='overlay-items'>
                        <img className='book-img' src={relatedBook.image}></img>
                        <div className='info-container'>
                            <p className='title'><b>{relatedBook.title}</b></p>
                            <p className='author'>{relatedBook.author}</p>
                            {relatedBook.rating && <RatingStar rating={relatedBook.rating} />}
                            <p className='genre'>{genre_}</p>
                            <p className='description'>{relatedBook.description} {relatedBook.description}</p>

                            <div className='button-container'>
                                <Button
                                    value="Add to Cart"
                                    onClick={(e) => {
                                        if (!check || !check.token) {
                                            navigate('/login')
                                        }
                                        const decodedToken = jwt_decode(check.token);
                                        if (decodedToken && decodedToken.status === true) {
                                            alert("Only users can add to cart.")
                                        }
                                        if (decodedToken && decodedToken.status === false) {
                                            submitAddToCart()
                                        }
                                    }}
                                    className='btn-style' />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

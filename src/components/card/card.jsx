import './card.scss'
import Button from '../button/button'
import DeleteData from '../deleteData/deleteData'
import SetInitialData from '../editData/setInititalData'
import { axiosInstance } from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import RatingStar from '../../utils/RatingStars'
import useBookHook from '../../hooks/useBookHook'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Card = ({ data, updateModal, setRelatedBook }) => {
    const viewButtonValue = "View"
    const navigate = useNavigate()

    const { refetchBooks, currentPage } = useBookHook()

    const handleGetFileApi = (image) => {
        axiosInstance
            .get(`book/get-file/${image}`)
            .then((response) => {
                if (response.status !== 200) {
                    alert("Something went wrong.")
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.data
            })
            .then((data) => {
                // swal("Book Added Successfully!")
                console.log('image found:', data);
            })
            .catch((error) => {
                // swal('Error adding book:', error)
                console.error('image not found:', error);
            });
    }

    const handleGetCall = (image) => {
        handleGetFileApi(image)
    }

    useEffect(() => {
        console.log("fetchedData", data)
    }, [data])

    return (
        <div className="card-container">
            <div className="list-container">
                {data?.data?.books?.map((book, index) => {
                    const genre_ = book.genre.join(", ")

                    // DELETE
                    const handleDeleteBook = () => {
                        axiosInstance
                            .delete(`/book/delete-book/${book._id}`)
                            .then((response) => {
                                if (response.status !== 200) {
                                    alert("Something went wrong.")
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                                return response.data
                            })
                            .then((data) => {
                                toast.success("Book Deleted Successfully!")
                                // navigate('/view-books')
                                // setUpdate(update => !update);
                                console.log('Book deleted successfully:', data);
                            })
                            .catch((error) => {
                                console.error('Error deleting book:', error);
                            });
                    };
                    const onDeleteSubmitHandler = async () => {
                        // e.preventDefault();
                        await handleDeleteBook();
                        await refetchBooks(currentPage)
                        // window.location.reload();
                    };

                    return <div key={index} className='list-items'>
                        <div className='image-container'>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/${book.image}`}></img>
                        </div>
                        <div className='list-details'>
                            <p className='title'><b>{book.title}</b></p>
                            <p className='author'>{book.author}</p>
                            {book.rating && <RatingStar rating={book.rating} />}
                            <p className='price'>Price:  {book.price}</p>
                            <Button
                                value={viewButtonValue}
                                onClick={(e) => {
                                    setRelatedBook(book);
                                    updateModal();
                                }} />
                            <div className='edit-delete-btn-container'>
                                <DeleteData onDeleteSubmitHandler={onDeleteSubmitHandler} />

                                <SetInitialData bookId={book._id}
                                    title={book.title}
                                    author={book.author}
                                    genre={book.genre}
                                    description={book.description}
                                    pages={book.pages}
                                    price={book.price}
                                    stock={book.stock}
                                    branch={book.branch}
                                    image={book.image} />
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Card
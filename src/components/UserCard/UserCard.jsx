import Button from '../button/button'
import RatingStar from '../../utils/RatingStars'
// import { addToCart } from '../../redux/Slices/UserSlice'

const Card = ({ data, updateModal, setRelatedBook }) => {

    return (
        <div className="card-container">
            <div className="list-container">
                {data?.data?.books?.map((book, index) => {
                    const genre_ = book.genre.join(", ")
                    return <div key={index} className='list-items'>
                        <div className='image-container'>
                            <img src={book.image}></img>
                        </div>
                        <div className='list-details'>
                            <p className='title'><b>{book.title}</b></p>
                            <p className='author'>{book.author}</p>
                            {book.rating && <RatingStar rating={book.rating} />}
                            <p className='price'>Price:  {book.price}</p>
                            <Button
                                value="View"
                                onClick={(e) => {
                                    setRelatedBook(book);
                                    updateModal();
                                }} />
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Card
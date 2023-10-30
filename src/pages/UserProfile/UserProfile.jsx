// UserProfile.js
import React, { useEffect, useState } from 'react';
import './UserProfile.scss';
import { useSelector } from 'react-redux';
import Header from '../../components/header/header';
import useReaderHook from '../../hooks/useReaderHook';
import useReviewHook from '../../hooks/useReviewHook';
import useAuthHook from '../../hooks/useAuthHook';
import { useForm, Controller } from 'react-hook-form';
import ReviewModal from '../../components/modalComponent/ReviewModal';
import Button from '../../components/button/button';
import jwt_decode from "jwt-decode";
import Footer from '../../components/footer/footer'

function UserProfile() {
  const { fetchedTransaction, updateBalance } = useReaderHook();
  const { fetchedReview } = useReviewHook()
  const boughtBooks = fetchedTransaction ? fetchedTransaction.bought_books : [];

  const user = useSelector((state) => state.user);
  const { handleLogout } = useAuthHook()
  const checkString = localStorage.getItem("user");
  const check = JSON.parse(checkString)



  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: onchange,
    defaultValues: {
      balance: 0
    }
  });

  const onSubmitHandler = (data) => {
    console.log("Balance, ", getValues("balance"))
    updateBalance(data.balance)
  };

  const [relatedBook, setRelatedBook] = useState([])

  // console.log("revvv", fetchedReview)

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [existingReview, setExistingReview] = useState(null);

  // Show or hide the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleSetRelatedBook = (book) => {
    setRelatedBook(book);
  }



  console.log("relatedbook from userprofile for review add", relatedBook)
  // useEffect(() => {

  // }, [relatedBook])

  return (
    <div>
      <Header />

      <div className='profile-container'>
        <div className='reader-info-container'>
          <h1>User Profile</h1>
          <p>username: {user.reader_name}</p>
          <p>Email: {user.reader_email}</p>

          <h2 className='update-balance-header'>Update Balance</h2>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className='balance-container'>
              <div className='form-items'>
                <Controller
                  name="balance"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[1-9][0-9]*$/,
                      message: "Balance must be non-negative integer.",
                    },
                    max: {
                      value: 50000,
                      message: 'Maximum balance is 50000',
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="number"
                      step="1"
                      placeholder="Enter balance"
                      {...field}
                      style={{ border: errors.balance ? "1px solid red" : "" }}
                    />
                  )}
                />
                {errors.balance && <h5>{errors.balance.message}</h5>}
              </div>

            </div>
            <Button type="submit"
              value="Update"
            />

          </form>
        </div>

        <div className='transaction-container'>
          <h2>Books You've Bought</h2>
          {fetchedTransaction?.map((bookInfo, index) => (
            bookInfo?.bought_books?.map((book, innerIndex) => {
              return (
                <div className='transaction-items' key={innerIndex}>
                  <div className='trans-img-container'>
                    <img src={book?.id?.image}></img>
                  </div>
                  <div className='info'>
                    <div className='title'>{book?.id?.title}</div>
                    <div className='author'>{book?.id?.author}</div>
                    <div className='genre'>{book?.id?.genre}</div>
                  </div>

                  <div>
                    <Button
                      type='submit'
                      value='Add Review'
                      onClick={() => {
                        toggleModal();
                        setIsEdit(false);
                        handleSetRelatedBook(book)

                        console.log('Button is clicked', relatedBook);
                      }}
                    />
                  </div>
                </div>
              );
            })
          ))}
        </div>

        <div className='transaction-container'>
          <h2>Your Reviews</h2>
          {fetchedReview?.map((review, index) => {
            return (
              <div className='transaction-items' key={index}>
                <div className='trans-img-container'>
                  <img src={review?.book?.image}></img>
                </div>
                <div className='info'>
                  <div className='title'>{review?.book?.title}</div>
                  <div className='rating'>Rating: {review?.rating}</div>
                  <div className='rev'>{review?.text}</div>
                </div>

                <div>
                  <Button
                    type='submit'
                    value='Edit Review'
                    onClick={() => {
                      // handleEditReview(review?.book?._id)
                      // console.log("review from button", review?.book)
                      // console.log("relatedbook id", relatedBook)
                      setIsEdit(true);
                      toggleModal();
                      handleSetRelatedBook(review?.book)
                      const existingReview = {
                        book: review?.book?._id,
                        rating: review?.rating,
                        text: review?.text,
                      };
                      setExistingReview(existingReview);

                      // console.log('Button is clicked', existingReview);
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {isModalOpen && (
        <ReviewModal
          relatedBook={relatedBook?.id?._id}
          toggleModal={toggleModal}
          isEdit={isEdit}
          existingReview={existingReview}
          titleText={isEdit ? "Edit Review" : "Add Review"}
        />
      )}
      <Footer/>
    </div>
  );

}

export default UserProfile;

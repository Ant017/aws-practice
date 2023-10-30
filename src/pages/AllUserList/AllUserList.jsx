import React from 'react';
import './AllUserList.scss'
import { useParams } from 'react-router-dom';
import useReaderHook from '../../hooks/useReaderHook';
import Header from '../../components/header/header';
import DeleteData from '../../components/deleteData/deleteData';
import EditUserData from '../../components/EditUserData/EditUserData';
import Loader from '../../components/Loader/Loader'
import Footer from '../../components/footer/footer'
// import './Loader.scss'
// import Loader from 'react-loader-spinner';

function AllUserList() {
    const { fetchedAllUsers, handleDeleteUser, onEditSubmitHandler, loading } = useReaderHook();
    // const { readerId } = useParams();

    // console.log("readerid from page", readerId)
    console.log("all users from page", fetchedAllUsers)

    return (
        <>
            <Header />
            <div className='user-container'>
                <h1 className='heading'>Users</h1>
                {loading ? ( // Display the spinner while loading is true
                    <div className="spinner-container">
                        <Loader />
                    </div>
                ) : (
                    fetchedAllUsers?.map((user, index) => (
                        <div className='user-block' key={index}>
                            <div className="user-items" key={index}>
                                <div>{user?.reader_name}</div>
                                <div>{user?.reader_email}</div>


                            </div>
                            <div className='icon-container'>
                                <DeleteData onDeleteSubmitHandler={() => handleDeleteUser(user._id)} />
                                {/* Pass onEditSubmitHandler directly to EditUserData component */}
                                <EditUserData readerId={user._id} reader_name={user.reader_name} 
                                status={user.status} onEditSubmitHandler={onEditSubmitHandler} />
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer/>
        </>
    );

}

export default AllUserList;

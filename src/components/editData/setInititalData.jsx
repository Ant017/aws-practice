import React from 'react'
import { useState, useEffect } from 'react'
import EditData from './EditData'
import { axiosInstance } from '../../utils/axiosInstance'
import swal from 'sweetalert'
import useBookHook from '../../hooks/useBookHook'

function setInititalData({ bookId, title, author, genre, description, pages, price, stock, branch, image }) {

    const { fetchedData, update, setUpdate, setFetchedData, refetchBooks, currentPage } = useBookHook()
    //set the form data for edit
    const [editFormData, setEditFormData] = useState({
        title,
        author,
        genre,
        description,
        pages,
        price,
        stock,
        branch,
        image
    })


    const onEditChangeHandler = (e) => {
        // getting name and value pair from frontend
        const { name, value } = e.target
        // setting the name and value in the formdata object 
        setEditFormData({ ...editFormData, [name]: value })
    }

    const handleEditBook = async (editFormData) => {
        // Make a POST request to your API endpoint
        axiosInstance
            .patch(`/book/edit-book/${bookId}`, editFormData)
            .then((response) => {
                if (response.status !== 200) {
                    swal("Something went wrong.")
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.data
            })
            .then(async (data) => {
                swal("Book Edited Successfully!")
                // await setFetchedData(fetchedData)
                console.log('Book edited successfully:', data);
            })
            .catch((error) => {
                console.error('Error editing book:', error);
            });
    };
    const onEditSubmitHandler = async () => {
        await handleEditBook(editFormData);
        // await setUpdate(!update);
        await refetchBooks(currentPage)
    };

    return (
        <EditData title={editFormData.title}
            author={editFormData.author}
            genre={editFormData.genre}
            description={editFormData.description}
            pages={editFormData.pages}
            price={editFormData.price}
            stock={editFormData.stock}
            branches={editFormData.branch}
            image={editFormData.image}
            editFormData={editFormData}
            onEditChangeHandler={onEditChangeHandler}
            onEditSubmitHandler={onEditSubmitHandler}
        />
    )
}

export default setInititalData
import React, { useState } from 'react'
import EditModal from '../modalComponent/EditModal'

function EditData({ title, author, genre, description, pages, price, stock, branches, image, editFormData, onEditChangeHandler, onEditSubmitHandler, handleEditBook }) {
    // const { editFormData, onEditChangeHandler, onEditSubmitHandler } = useBookHook();

    // modal
    const [showBookModal, setShowBookModal] = useState(false)
    // const [relatedBook, setRelatedBook] = useState([])

    //show or hide the modal
    const editBookModal = () => {
        setShowBookModal(!showBookModal)
    }

    return (
        <>
            {showBookModal && <EditModal
                title={title}
                author={author}
                genre={genre}
                description={description}
                pages={pages}
                price={price}
                stock={stock}
                branches={branches}
                image={image}
                editFormData={editFormData}
                onEditChangeHandler={onEditChangeHandler}
                onEditSubmitHandler={onEditSubmitHandler}
                editBookModal={editBookModal}
                handleEditBook={handleEditBook} />}

            <i className="fa-solid fa-pen-to-square"
                onClick={(e) => {
                    editBookModal()
                }}></i>
        </>
    )
}

export default EditData
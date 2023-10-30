import React, { useState } from 'react'
import DeleteModal from '../modalComponent/deleteModal'

function DeleteData({ onDeleteSubmitHandler }) {

    // modal
    const [showBookModal, setShowBookModal] = useState(false)

    //show or hide the modal
    const deleteBookModal = () => {
        setShowBookModal(!showBookModal)
    }

    return (
        <>
            {showBookModal && <DeleteModal
                deleteBookModal={deleteBookModal}
                onDeleteSubmitHandler={onDeleteSubmitHandler} />}
            <i className="fa-solid fa-trash"
                onClick={(e) => {
                    deleteBookModal()
                }}></i>
        </>
    )
}

export default DeleteData
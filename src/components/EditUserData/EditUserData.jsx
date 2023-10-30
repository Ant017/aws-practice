import React, { useState } from 'react';
import EditUserModal from '../modalComponent/EditUserModal';

function EditUserData({ readerId, reader_name, status, onEditSubmitHandler }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const editUserModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    console.log("readerid from editdata", readerId)
    return (
        <>
            {isModalOpen && (
                <EditUserModal
                    readerId={readerId}
                    reader_name={reader_name}
                    status={status}
                    onEditSubmitHandler={onEditSubmitHandler} // Pass the update function to the modal
                    editUserModal={editUserModal}
                />
            )}

            <i className="fa-solid fa-pen-to-square" onClick={editUserModal}></i>
        </>
    );
}

export default EditUserData;

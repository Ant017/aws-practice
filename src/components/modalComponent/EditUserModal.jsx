import React from 'react';
// import './editUserModal.scss';
import Button from '../button/button';
import { useForm, Controller } from 'react-hook-form';
import useReaderHook from '../../hooks/useReaderHook';

function EditUserModal({ readerId, reader_name, status, editUserModal }) {
    const { handleSubmit,
        control,
        formState: { errors },
        getValues,
    } = useForm({
        defaultValues: {
            reader_name: reader_name,
            status: status,
        },
    });

    const { handleEditUser } = useReaderHook();

    const onSubmitHandler = (data) => {
        console.log("reader_name ", getValues("reader_name"))
        // Call the update function with the updated data
        // onEditSubmitHandler(readerId, data);
        // Close the modal
        handleEditUser(readerId, data)
        editUserModal();
    };

    console.log("readerid from editModal", readerId)
    return (
        <div className="bookModal-container">
            <div className="bookModal-item">
                <i className="fa-solid fa-x" onClick={editUserModal}></i>

                <div className="add-book-container">
                    <h1 className="add-book-header">Edit User</h1>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <div className="review-container">
                            <div className="form-items">
                                <h4>Reader's name</h4>
                                <Controller
                                    name="reader_name"
                                    control={control}
                                    rules={{
                                        pattern: {
                                            value: /^[^\s]+$/,
                                            message: 'Name cannot contain spaces.',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <input
                                            placeholder="Enter reader's name"
                                            {...field}
                                            style={{ border: errors.reader_name ? '1px solid red' : '' }}
                                        />
                                    )}
                                />
                                {errors.reader_name && <h5>{errors.reader_name.message}</h5>}
                            </div>
                            <div className="form-items">
                                <h4>Status</h4>
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            placeholder="Change status"
                                            {...field}
                                            style={{ border: errors.status ? '1px solid red' : '' }}
                                        />
                                    )}
                                />
                                {errors.status && <h5>{errors.status.message}</h5>}
                            </div>
                        </div>
                        <Button type="submit" value="Update" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUserModal;

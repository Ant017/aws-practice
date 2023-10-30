import React from 'react'
import './bookModal.scss'
import Form from '../form/form'
import Button from '../button/button'
import useBookHook from '../../hooks/useBookHook'

function EditModal({ editBookModal, title, author, genre,
    description, pages, price, stock, branches, image,
    onEditChangeHandler, onEditSubmitHandler }) {

    const { refetchBooks, currentPage } = useBookHook()
    return (
        <div className='bookModal-container'>
            <div className='bookModal-item'>
                <i className="fa-solid fa-x" onClick={editBookModal}></i>

                <div className='add-book-container'>
                    <h1 className='add-book-header'>Edit This Book</h1>

                    <div className='form-container'>
                        <Form className='form-items'
                            label='Title'
                            type='text'
                            name='title'
                            value={title}
                            placeholder=''
                            onChange={onEditChangeHandler}

                        />
                        <Form className='form-items'
                            label='Author'
                            type='text'
                            name='author'
                            value={author}
                            placeholder=''
                            onChange={onEditChangeHandler}

                        />
                        <Form className='form-items'
                            label='Genre'
                            type='text'
                            name='genre'
                            value={genre}
                            placeholder=''
                            onChange={onEditChangeHandler}

                        />
                        <Form className='form-items'
                            label='Description'
                            type='text'
                            name='description'
                            value={description}
                            placeholder=''
                            onChange={onEditChangeHandler}

                        />
                        <Form className='form-items'
                            label='Pages'
                            type='text'
                            name='pages'
                            value={pages}
                            placeholder=''
                            onChange={onEditChangeHandler}

                        />
                        <Form className='form-items'
                            label='Price'
                            type='text'
                            name='price'
                            value={price}
                            placeholder=''
                            onChange={onEditChangeHandler}

                        />
                        <Form className='form-items'
                            label='Stock'
                            type='text'
                            name='stock'
                            value={stock}
                            placeholder=''
                            onChange={onEditChangeHandler}

                        />
                        <Form className='form-items'
                            label='Branches'
                            type='text'
                            name='branch'
                            value={branches}
                            placeholder=''
                            onChange={onEditChangeHandler}

                        />
                        <Form className='form-items'
                            label='Image URL'
                            type='text'
                            name='image'
                            value={image}
                            placeholder=''
                            onChange={onEditChangeHandler}

                        />
                    </div>
                    <Button type='submit'
                        value='Submit'
                        onClick={() => {
                            onEditSubmitHandler()
                            refetchBooks(currentPage)
                        }} />
                </div>
            </div>
        </div>
    )
}

export default EditModal

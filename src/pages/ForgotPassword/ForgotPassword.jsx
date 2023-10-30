import React from 'react'
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import { useState } from 'react'
import { axiosInstance } from '../../utils/axiosInstance'
import Header from '../../components/header/header'

function ForgotPassword() {
    const [emailValue, setEmailValue] = useState({
        email: ''
    })

    const onEmailChangeHandler = (e) => {
        const { name, value } = e.target
        setEmailValue({ ...emailValue, [name]: value })
    }

    const forgetPasswordApi = () => {
        const requestData = {
            recipient: emailValue.email
        };
        axiosInstance
            .post(`/mail/send`, requestData)
            .then((response) => {
                if (response.status !== 200) {
                    alert("Something went wrong.")
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log("response", response)
                return response.data
            })
            .then((data) => {
                console.log('Mail sent successfully:', data);
            })
            .catch((error) => {
                console.error('Error sending mail:', error);
            });
    }

    const onButtonClickHandler = () => {
        forgetPasswordApi()
    }


    return (
        <>
            <Header />
            <div className='signup-container'>
                <div className='overlay'>
                    <div className='sign-up'>
                        <h1 className='sign-up-header'>Log in to Your Account</h1>
                        <div className='form-container'>
                            <Form className='form-items'
                                label='Email: '
                                type='text'
                                name='email'
                                value={emailValue.email}
                                placeholder='Enter email'
                                onChange={onEmailChangeHandler}
                            />
                        </div>
                        <Button type="submit"
                            value="Reset Password"
                            onClick={onButtonClickHandler} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
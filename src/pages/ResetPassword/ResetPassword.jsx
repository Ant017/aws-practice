import React, { useEffect, useState } from 'react'
import Form from '../../components/form/form'
import Button from '../../components/button/button'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../utils/axiosInstance'
import Header from '../../components/header/header'
import '../ForgotPassword/ForgotPassword.scss'
import swal from 'sweetalert'

function ResetPassword() {

    const { token, userId } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handlePasswordMatch = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    }

    const resetPasswordApi = () => {
        const requestData = {
            newPassword: password,
            confirmPassword: confirmPassword,
        };
        axiosInstance
            .post(`/mail/reset/${token}/${userId}`, requestData)
            .then((response) => {
                if (response.status !== 200) {
                    alert("Something went wrong.")
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log("response", response)
                return response.data
            })
            .then((data) => {
                alert("successful")
                console.log('Mail sent successfully:', data);
            })
            .catch((error) => {
                console.error('Error sending mail:', error);
            });
    }

    const onButtonClickHandler = () => {
        handlePasswordMatch()
        resetPasswordApi()
    }

    const validateLinkApi = () => {
        axiosInstance
            .get(`/mail/validate/${token}/${userId}`)
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

    useEffect(() => {
        validateLinkApi()
    })

    return (
        <>
            <Header />
            <div className='signup-container'>
                <div className='overlay'>
                    <div className='sign-up'>
                        <h1 className='sign-up-header'>Reset Password</h1>
                        <div className='form-container'>
                            <Form className='form-items'
                                label='New Password '
                                type='password'
                                name='email'
                                value={password}
                                placeholder='Enter new password'
                                onChange={handlePasswordChange}
                            />
                            <Form className='form-items'
                                label='Confirm Password: '
                                type='password'
                                name='email'
                                value={confirmPassword}
                                placeholder='Confirm password'
                                onChange={handleConfirmPasswordChange}
                            />
                        </div>
                        <Button type="submit"
                            value="Update Password"
                            onClick={onButtonClickHandler}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
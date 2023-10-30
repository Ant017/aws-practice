import React, { useState } from 'react'
import Header from '../../components/header/header'
import '../Signup/Signup.scss'
import { useForm, Controller } from "react-hook-form"
import { AiFillEye } from "react-icons/ai";
import useAuthHook from '../../hooks/useAuthHook';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const { handleLogin } = useAuthHook()

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      reader_email: "",
      password: ""
    }
  });

  const onSubmitHandler = (data) => {
    console.log("Form is submitted ");
    console.log("Reader's email ", getValues("reader_email"));
    handleLogin(data)
  };

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = (e) => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Header />
      <div className='signup-container'>
        <div className='overlay'>
          <div className='sign-up'>
            <h1 className='sign-up-header'>Log in to Your Account</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className='form-container'>

                <div className='form-items'>
                  <h4>Email</h4>
                  <Controller
                    name="reader_email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                        message: "Enter a valid email address.",
                      },
                    }}
                    render={({ field }) => (
                      <input className='inp'
                        placeholder="Enter email"
                        {...field}
                        style={{ border: errors.reader_email ? "1px solid red" : "" }}
                      />
                    )}
                  />
                  {errors.reader_email && <h5 className='text'>{errors.reader_email.message}</h5>}
                </div>

                <div className='form-items'>
                  <h4>Password</h4>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                    }}
                    render={({ field }) => (
                      <div className='input-container'>
                        <input
                          placeholder="Enter password"
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                          style={{ border: errors.confirm_password ? "1px solid red" : "" }}
                        />
                        <div className="eye-icon-container" onClick={togglePasswordVisibility}>
                          <AiFillEye />
                        </div>
                      </div>
                    )}
                  />
                  {errors.password && <h5 className='text'>{errors.password.message}</h5>}
                </div>
                <div className='text2'>Not registered?
                  <Link className='link' to="/signup">Sign up</Link>
                </div>
                <div className='text2'>
                  <Link className='link' to="/forgot-password">Forgot Password?</Link>
                </div>
                <button className='btn' type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

import React, { useState } from 'react'
import Header from '../../components/header/header'
import './Signup.scss'
import { useForm, Controller } from "react-hook-form"
import { AiFillEye } from "react-icons/ai";
import useAuthHook from '../../hooks/useAuthHook';
import { Link } from 'react-router-dom';

function Signup() {

  const { handleSignUp } = useAuthHook()
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch
  } = useForm({
    mode: "onChange",
    defaultValues: {
      reader_name: "",
      reader_email: "",
      balance: null,
      password: "",
      confirm_password: "",
    },
  });

  const onSubmitHandler = (data) => {
    // setValue("fullname", getValues("firstname") + getValues("lastname"))
    delete data.confirm_password;
    console.log("Form is submitted ");
    // console.log("First name ", getValues("firstname"));
    // console.log("Last name ", getValues("lastname"));
    // console.log("Full name ", getValues("fullname"));
    console.log("Username ", getValues("reader_name"));
    console.log("Reader's email ", getValues("reader_email"));
    handleSignUp(data)

  };

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = (e) => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = (e) => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <>
      <Header />
      <div className='signup-container'>
        <div className='overlay'>
          <div className='sign-up'>
            <h1 className='sign-up-header'>Register as a New User!</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className='form-container'>

                <div className='form-items'>
                  <h4>Username</h4>
                  <Controller
                    name="reader_name"
                    control={control}
                    rules={{
                      required: "Username is required",
                      minLength: {
                        value: 4,
                        message: "Minimum length must be 4",
                      },
                      maxLength: {
                        value: 30,
                        message: "Maximum length must be 30",
                      },
                    }}
                    render={({ field }) => (
                      <input className='inp'
                        placeholder="Enter username"
                        {...field}
                        style={{ border: errors.reader_name ? "1px solid red" : "" }}
                      />
                    )}
                  />
                  {errors.reader_name && <h5 className='text'>{errors.reader_name.message}</h5>}
                </div>

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
                  <h4>Balance</h4>
                  <Controller
                    name="balance"
                    control={control}
                    // rules={{
                    //   required: "Balance is required",
                    //   minLength: {
                    //     value: 4,
                    //     message: "Minimum length must be 4",
                    //   },
                    //   maxLength: {
                    //     value: 30,
                    //     message: "Maximum length must be 30",
                    //   },
                    // }}
                    render={({ field }) => (
                      <input className='inp' type='number'
                        placeholder="Enter balance"
                        {...field}
                        style={{ border: errors.balance ? "1px solid red" : "" }}
                      />
                    )}
                  />
                  {errors.balance && <h5 className='text'>{errors.balance.message}</h5>}
                </div>

                <div className='form-items'>
                  <h4>Password</h4>
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/,
                        message: "Password must contain at least one capital letter, one digit, one special character, and be 8 characters or more long.",
                      },
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

                <div className='form-items'>
                  <h4>Confirm Password</h4>
                  <Controller
                    name="confirm_password"
                    control={control}
                    rules={{
                      required: "Confirm your password",
                      validate: (value) =>
                        value === watch("password") ||
                        "Confirm password should match given password",
                    }}
                    render={({ field }) => (
                      <div className='input-container'>
                        <input
                          placeholder="confirm password"
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
                  {errors.confirm_password && <h5 className='text'>{errors.confirm_password.message}</h5>}
                </div>
                <div className='text2'>Already a user?
                  <Link className='link' to="/login">Log in</Link>
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

export default Signup

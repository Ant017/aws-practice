import '../header/header.scss'
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import './AuthSection.scss'
import { BiRightArrow } from 'react-icons/bi'

/* There are 3 cases here - 
1. a general header
2. header when admin logs in
3. header when a normal user logs in */

const AuthSection = () => {

    const checkString = localStorage.getItem("user");
    const check = JSON.parse(checkString)
    // console.log("Authenticating", check.token);
    if (!check || !check.token) {
        return (
            <div className='auth-container'>
                <div>
                    <Link className='link' to="/login">Log in<BiRightArrow className='arrow' /></Link>
                </div>
                <div>
                    <Link className='link' to="/signup">Sign up<BiRightArrow className='arrow' /></Link>
                </div>
            </div>
        );
    }

    return <Navigate to="/" />;
}

export default AuthSection
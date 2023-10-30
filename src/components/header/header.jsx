import './header.scss'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import useAuthHook from '../../hooks/useAuthHook';
import { PiShoppingCartFill, PiHeartStraightFill } from 'react-icons/pi'
import { useSelector } from 'react-redux';
import { GiSecretBook } from 'react-icons/gi'
import { ImBook } from 'react-icons/im'

/* There are 3 cases here - 
1. a general header
2. header when admin logs in
3. header when a normal user logs in */

const Header = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user);
    const { handleLogout } = useAuthHook()
    const checkString = localStorage.getItem("user");
    const check = JSON.parse(checkString)
    // console.log("Authenticating", check.token);
    if (!check || !check.token) {
        return (
            <div className="header-container">
                <div>
                    <Link className='link' to="/"><ImBook /></Link>
                </div>
                <div>
                    <Link className='link' to="/">Home</Link>
                </div>
                <div>
                    <Link className='link' to="/view-books-general">Books</Link>
                </div>

                <div>
                    <Link className='link' to="/about">About</Link>
                </div>
                <div>
                    <Link className='link' to="/contact">Contact</Link>
                </div>
            </div>
        )
    }
    const decodedToken = jwt_decode(check.token);
    if (decodedToken && decodedToken.status === true) {
        return (
            <div className="header-container">
                <div>
                    <Link className='link1' to="/"><ImBook /></Link>
                </div>
                <div>
                    <Link className='link' to="/">Home</Link>
                </div>
                <div>
                    <Link className='link' to="/login/add-book">Add Books</Link>
                </div>
                <div>
                    <Link className='link' to="/login/manage-book">Manage Books</Link>
                </div>
                <div>
                    <Link className='link' to="/login/manage-user">Manage Users</Link>
                </div>
                <div>
                    <Link className='link' to="/login/show-transaction">Transactions</Link>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={handleLogout}>
                    Log out
                </div>
            </div>
        )
    }
    if (decodedToken && decodedToken.status === false) {
        return (
            <div className="header-container">
                <div>
                    <Link className='link1' to="/"><ImBook /></Link>
                </div>
                <div>
                    <Link className='link' to="/">Home</Link>
                </div>
                <div>
                    <Link className='link' to="/view-books-general">Books</Link>
                </div>
                <div>
                    <Link className='link' to="/login/profile">Profile</Link>
                </div>
                {/* <img
                    src={`https://robohash.org/${user.reader_email}?size=45x45`}
                    alt=""
                    className="userImgCircle"
                /> */}
                <div>
                    <PiShoppingCartFill
                        title="Your Cart"
                        style={{ fontSize: '24px', cursor: 'pointer' }}
                        onClick={() => {
                            navigate("/login/cart")
                        }}
                    />
                </div>
                <div style={{ cursor: 'pointer' }} onClick={handleLogout}>
                    Log out
                </div>
            </div>
        )
    }
    return (
        <div className="header-container">
            <div>
                <Link className='link' to="/">Home</Link>
            </div>
            <div>
                <Link className='link' to="/view-books-general">Books</Link>
            </div>

            <div>
                <Link className='link' to="/about">About</Link>
            </div>
            <div>
                <Link className='link' to="/contact">Contact</Link>
            </div>
        </div>
    )
}


export default Header
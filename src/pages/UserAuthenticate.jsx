import { Navigate, Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios";
import jwt_decode from "jwt-decode";

const UserAuthenticate = () => {
    console.log("checking auth")
    const checkString = localStorage.getItem("user");
    const check = JSON.parse(checkString)

    if (!check || !check.token) {
        return <Navigate to="/login" />;
    }

    const decodedToken = jwt_decode(check.token);
    console.log(decodedToken.status)

    if (decodedToken && decodedToken.status === false) {
        return (
            <div>
                <Outlet />
            </div>
        );
    } else {
        return <Navigate to="/login" />;
    }
};

export default UserAuthenticate;

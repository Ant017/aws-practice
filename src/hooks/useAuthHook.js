import { axiosInstance, axiosInstanceToken } from '.././utils/axiosInstance'
import { useDispatch } from 'react-redux';
import { addUser, logoutUser } from '../redux/Slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { toast } from 'react-toastify';


const useAuthHook = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignUp = (formData) => {
        // Make a POST request to your API endpoint
        console.log(formData)
        axiosInstance
            .post('/auth/signup', formData)
            .then((response) => {
                if (response.status !== 200) {
                    alert("Something went wrong.")
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.data
            })
            .then((data) => {
                dispatch(addUser(data))
                if (data.status === false) {
                    navigate("/login/profile");
                }
                toast.success("Signed up successfully")
            })
            .catch((error) => {
                alert('Error signing up:')
                console.error('Error signing up:', error);
            });


    };

    const handleLogin = async (formData) => {
        // Make a POST request to your API endpoint
        await axiosInstanceToken
            .post('/auth/login', formData)
            .then((response) => {
                if (response.status !== 200) {
                    alert("Something went wrong.")
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.data
            })
            .then((response) => {
                // console.log("response - ", response.data)
                dispatch(addUser(response.data))
                if (response.data.status === true) {
                    navigate("/");
                }
                else {
                    navigate("/");
                }
            })
            .catch((error) => {
                toast.error("Authentication failed")
                console.error('Error logging in:', error);
            });
    }

    const handleLogout = () => {
        // Dispatch the logout action to clear user data
        dispatch(logoutUser());
        // Redirect the user to the home page
        navigate('/')
    };
    return { handleSignUp, handleLogin, handleLogout }
}

export default useAuthHook;
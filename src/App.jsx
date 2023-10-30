import AllBooksList from "./pages/AllBooksList/AllBooksList";
import AddBook from "./pages/AddBook/AddBook";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import NotFoundPage from "./pages/NotFoundPage";
import AdminAuthenticate from "./pages/AdminAuthenticate";
import UserAuthenticate from "./pages/UserAuthenticate";
import About from "./pages/About/About";
import BookList from "./pages/BookListGeneral/BookList";
import UserProfile from './pages/UserProfile/UserProfile'
import UserCart from './pages/UserCart/UserCart'
import AllUserList from "./pages/AllUserList/AllUserList";
import AllCartsList from "./pages/AllCartsList/AllCartsList";
import AllTransactionList from "./pages/AllTransactionList/AllTransactionList";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";

function App() {
  console.log("this is app")
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="view-books-general" element={<BookList />} />
          <Route path="about" element={<About />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token/:userId" element={<ResetPassword />} />
          <Route element={<AdminAuthenticate />}>
            <Route path="login/manage-book" element={<AllBooksList />} />
            <Route path="login/add-book" element={<AddBook />} />
            <Route path="login/manage-user" element={<AllUserList />} />
            {/* <Route path="login/show-cart" element={<AllCartsList />} /> */}
            <Route path="login/show-transaction" element={<AllTransactionList />} />
          </Route>
          <Route element={<UserAuthenticate />}>
            <Route path="login/profile" element={<UserProfile />} />
            <Route path="login/cart" element={<UserCart />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

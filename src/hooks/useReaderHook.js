import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance, axiosInstanceToken } from '.././utils/axiosInstance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

const useReaderHook = () => {
  const [loading, setLoading] = useState(true);
  const [fetchedTransaction, setFetchedTransaction] = useState([]);
  const [fetchedAllUsers, setFetchedAllUsers] = useState([])
  const [allTransactions, setAllTransactions] = useState([])
  const [balance, setBalance] = useState([])
  const checkString = localStorage.getItem("user");
  const check = JSON.parse(checkString)
  const { readerId } = useParams();

  // console.log("param from hook", readerId)

  const fetchTransactions = async () => {
    // Fetch data from API with custom headers
    await axiosInstanceToken
      .get("/cart/show-my-transaction", {
        headers: {
          'Authorization': `Bearer ${check.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // console.log(response.data.data)
        setFetchedTransaction(response.data.data)
      })
      .catch((error) => {
        // Handle other errors (network error, timeout, etc.) here.
        console.error("Other Error:", error);
      })
  };

  const fetchBalance = async () => {
    // Fetch data from API with custom headers
    await axiosInstanceToken
      .get("/reader/check-balance", {
        headers: {
          'Authorization': `Bearer ${check.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // console.log(response.data.data)
        setBalance(response.data.data)
      })
      .catch((error) => {
        // Handle other errors (network error, timeout, etc.) here.
        console.error("Other Error:", error);
      })
  };

  const updateBalance = async (balance) => {
    console.log(typeof (balance))
    try {
      const response = await axiosInstanceToken.put('/reader/update-balance', {
        balance: balance
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${check.token}`,
        }
      });

      if (response.status === 200) {
        console.log('Balance Updated Successfully:', response.data);
        // You can handle success here, for example showing a success message.
        swal("Balance Updated Successfully!");
      } else {
        // Handle other status codes if needed.
        console.error(`HTTP error! status: ${response.status}`);
        alert("Something went wrong.");
      }
    } catch (error) {
      // Handle errors from the request.
      if (error.response && error.response.data && error.response.data.message) {
        swal(error.response.data.message);
        console.error('Error updating balance:', error.response.data);
      } else {
        console.error('Error updating balance:', error);
        // Handle other types of errors.
      }
    }
  };

  const getAllUser = async () => {
    // Fetch data from API with custom headers
    setLoading(true)
    await axiosInstanceToken
      .get("/reader/get-user-info", {
        headers: {
          'Authorization': `Bearer ${check.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // console.log(response.data.data)
        setLoading(false)
        setFetchedAllUsers(response.data.data)
      })
      .catch((error) => {
        // Handle other errors (network error, timeout, etc.) here.
        setLoading(false)
        console.error("Other Error:", error);
      })
  }

  // DELETE


  const handleDeleteUser = (readerId) => {
    axiosInstanceToken
      .delete(`/reader/delete-reader/${readerId}`, {
        headers: {
          'Authorization': `Bearer ${check.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("Something went wrong.")
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data
      })
      .then((data) => {
        swal("Reader Deleted Successfully!")
        console.log('Reader deleted successfully:', data);
      })
      .catch((error) => {
        if (error.response.data.success === false) {
          swal(error.response.data.message);
        }
        console.error('Error deleting Reader:', error.response.data.success);
      });
  };

  const handleEditUser = async (readerId) => {
    await axiosInstanceToken
      .patch(`/reader/edit-reader/${readerId}`, {
        headers: {
          'Authorization': `Bearer ${check.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          alert("Something went wrong.")
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data
      })
      .then((data) => {
        swal("Reader Edited Successfully!")
        console.log('Reader Edited successfully:', data);
      })
      .catch((error) => {
        if (error.response.data.success === false) {
          swal(error.response.data.message);
        }
        console.error('Error editing reader:', error.response);
      });
  };

  // const onEditSubmitHandler = (readerId) => {
  //   handleEditUser(readerId)
  // }

  const onDeleteSubmitHandler = (readerId) => {
    //api
    handleDeleteUser(readerId);
  };

  const getAllTransactions = async () => {
    // Fetch data from API with custom headers
    await axiosInstanceToken
      .get("/cart/get-transaction", {
        headers: {
          'Authorization': `Bearer ${check.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // console.log(response.data.data)
        setAllTransactions(response.data.data)
      })
      .catch((error) => {
        // Handle other errors (network error, timeout, etc.) here.
        // swal(error.response.data.message)
        console.error("Other Error:", error);
      })
  }

  useEffect(() => {
    fetchTransactions();
    getAllUser()
    getAllTransactions()
    fetchBalance()
  }, []);

  return {
    fetchedTransaction, balance, updateBalance, fetchedAllUsers,
    allTransactions, onDeleteSubmitHandler, loading, handleEditUser, handleDeleteUser
  };
};

export default useReaderHook;

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/Store/store.js';
import { addUser } from './redux/Slices/UserSlice'; // Import the actions

const savedUser = JSON.parse(localStorage.getItem('user'));

// If user data exists in local storage, dispatch actions to update the store
if (savedUser) {
  store.dispatch(addUser(savedUser));
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
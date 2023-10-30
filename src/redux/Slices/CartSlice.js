import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
    name: "cart",
    initialState: [], // Initial state is an empty array
    reducers: {
        addBookToCart: (state, action) => {
            const bookToAdd = action.payload;
            const existingBook = state.find((book) => book?._id === bookToAdd?._id);

            if (existingBook) {
                console.log("exist", existingBook)
                existingBook.quantity += 1;
            } else {
                state.push({
                    ...bookToAdd,
                    quantity: 1,
                });
            }
        },
        removeBookFromCart: (state, action) => {
            const bookToAdd = action.payload;
            const existingBook = state.find((book) => book?._id === bookToAdd?._id);

            if (existingBook) {
                console.log("exist", existingBook)
                existingBook.quantity -= 1;
            } else {
                state.push({
                    ...bookToAdd,
                    quantity: 1,
                });
            }
        },
        clearCart: () => [],
    },
});

export const {
    addBookToCart,
    removeBookFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartReducer.actions;

export default cartReducer.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface CartState {
    cart: object;
}

// Initial state
const initialState: CartState = {
    cart: [],
};

// Actual Slice
export const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        SET_CART(state, action) {
            state.cart = action.payload;
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.cart,
            };
        },
    },
});

export const { SET_CART } = cart.actions;

export const selectCartState = (state: AppState) => state.cart.cart;

export default cart.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface CustomerState {
    customer: object;
}

// Initial state
const initialState: CustomerState = {
    customer: {},
};

// Actual Slice
export const customer = createSlice({
    name: "customer",
    initialState,
    reducers: {
        // Action to set the authentication status
        setCustomer(state, action) {
            state.customer = action.payload;
        },
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    },
});

export const { setCustomer } = customer.actions;

export const selectCustomerState = (state: AppState) => state.customer.customer;

export default customer.reducer;
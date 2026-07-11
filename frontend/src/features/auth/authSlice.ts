import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type User = {
    _id: string;
    username: string;
    email: string;
};

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },

        authSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },

        authFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },

        setUser:(state,action: PayloadAction<User>) => {
            state.user = action.payload
        }
    },
});

export const {
    authStart,
    authFailure,
    authSuccess,
    logout,
    setUser
} = authSlice.actions;

export default authSlice.reducer;
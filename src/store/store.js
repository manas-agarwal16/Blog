import {configureStore} from  "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice.js"

const store = configureStore({
    reducer: {
        authSliceReducer,
    }
});

export default store
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';


// TODO: load initial data
const store = configureStore({ reducer: rootReducer});

export default store;

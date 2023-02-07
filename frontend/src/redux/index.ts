import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from './store/reducer'
export const store = configureStore({
    reducer: {
        articles: articlesReducer
    }
});
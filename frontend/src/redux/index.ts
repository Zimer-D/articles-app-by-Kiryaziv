import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import articlesReducer from './store/reducer'

const persistConfig = {
    key: 'root',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, articlesReducer)
// export const store = configureStore({
//     reducer: {
//         articles: articlesReducer
//     }
// });
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
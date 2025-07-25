import { configureStore } from "@reduxjs/toolkit";
import searchQueryReducer from "../features/searchQuerySlice";
import { kinopoiskApi } from "../services/kinopoiskApi";
import currentQueryReducer from "../features/currentQuerySlice";

export const store = configureStore({
  reducer: {
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
    currentQuery: currentQueryReducer,
    searchQuery: searchQueryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(kinopoiskApi.middleware),
});

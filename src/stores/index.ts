import { configureStore } from "@reduxjs/toolkit";
import localeReducer from "./localeReducer";

const store = configureStore({
  reducer: {
    locale: localeReducer,
  },
});

export default store;

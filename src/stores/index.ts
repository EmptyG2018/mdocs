import { configureStore } from "@reduxjs/toolkit";
import localeReducer from "./localeReducer";

const store = configureStore({
  reducer: {
    locale: localeReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>

export default store;

import { createSlice } from "@reduxjs/toolkit";
import locales from "../locales";

// 语言默认配置
const initialState = {
  currentLocale: "zh-CN",
  locales,
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale: (state, { payload }) => {
      state.currentLocale = payload;
    },
  },
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;

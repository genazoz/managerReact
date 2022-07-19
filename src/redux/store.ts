import { configureStore } from "@reduxjs/toolkit";
import organizations from "./slices/organizationsSlice";
import contacts from "./slices/contactsSlice";
import settings from "./slices/settingsSlice";
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    organizations,
    contacts,
    settings,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

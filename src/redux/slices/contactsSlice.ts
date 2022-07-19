import axios from "axios";
import {createSlice} from '@reduxjs/toolkit'
import {createAsyncThunk} from "@reduxjs/toolkit";

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export type ContactType = {
  id: string,
  lastname: string,
  firstname: string,
  patronymic: string,
  phone: string,
  email: string,
  createdAt: string,
  updatedAt: string
}

interface ContactsSliceState {
  items: ContactType[];
  status: Status;
}

const initialState: ContactsSliceState = {
  items: [],
  status: Status.LOADING // loading | success | error
}

export const fetchContacts = createAsyncThunk<ContactType[]>('contacts/fetchContactsStatus', async () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ2VuYXpveiIsImlhdCI6MTY1Nzk3OTQ4MiwiZXhwIjoxNjU4NTg0MjgyfQ.TBjrrEXu4s7h5x7jHtbGsSGPnje1xkO2219FnIzjNlY';
  const url = 'http://135.181.35.61:2112/contacts/16';
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };

  const {data} = await axios.get<ContactType>(url, config);

  return [data];
})

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.pending, (state) => {
      state.status = Status.LOADING;
    })
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchContacts.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    })
  },
})

export default contactsSlice.reducer
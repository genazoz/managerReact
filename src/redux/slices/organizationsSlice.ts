import axios from "axios";
import {createSlice} from '@reduxjs/toolkit'
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../store";

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
type Contract = {
  no: string;
  issue_date: string;
}
type Photo = {
  filepath: string;
  name: string;
  thumbpath: string;
}
export type OrganizationType = {
  businessEntity: string;
  contactId: string;
  contract: Contract;
  createdAt: string;
  id: string;
  name: string;
  photos: Photo[]
  shortName: string;
  status: string;
  type: string[];
  updatedAt: string;
}
interface OrganizationsSliceState {
  items: OrganizationType[];
  status: Status;
}

export const fetchOrganizations = createAsyncThunk<OrganizationType[]>('organizations/fetchOrganizationsStatus', async () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ2VuYXpveiIsImlhdCI6MTY1Nzk3OTQ4MiwiZXhwIjoxNjU4NTg0MjgyfQ.TBjrrEXu4s7h5x7jHtbGsSGPnje1xkO2219FnIzjNlY';
  const url = 'http://135.181.35.61:2112/companies/12';
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };

  const {data} = await axios.get<OrganizationType>(url,config);

  return [data];
})

const initialState: OrganizationsSliceState = {
  items: [],
  status: Status.LOADING // loading | success | error
}

export const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrganizations.pending, (state) => {
      state.status = Status.LOADING;
    })
    builder.addCase(fetchOrganizations.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchOrganizations.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    })
  },
})

export const organizationsSelector = (state: RootState) => state.organizations;

export default organizationsSlice.reducer
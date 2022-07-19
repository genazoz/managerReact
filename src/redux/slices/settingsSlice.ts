import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";

interface SettingsSliceState {
  serverUrl: string,
  token: string;
  showPreloader: boolean;
}

const initialState: SettingsSliceState = {
  serverUrl: `http://135.181.35.61:2112`,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ2VuYXpveiIsImlhdCI6MTY1Nzk3OTQ4MiwiZXhwIjoxNjU4NTg0MjgyfQ.TBjrrEXu4s7h5x7jHtbGsSGPnje1xkO2219FnIzjNlY',
  showPreloader: true,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
  },
})

export const settingsSelector = (state: RootState) => state.settings;

export default settingsSlice.reducer
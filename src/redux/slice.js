import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchAll } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: '',
};

const slicer = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(contact => contact.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  
  },
});

export const { setSearch } = slicer.actions;
export default slicer.reducer;

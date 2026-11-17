import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signUp = createAsyncThunk(
  "users/signUp",
  async ({ name, email, password }, thunkApi) => {
    try {
      const res = await axios.post("/users/signup", { name, email, password });
      setAuthHeader(res.data.token);
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "users/logIn",
  async ({ email, password }, thunkApi) => {
    try {
      const res = await axios.post("/users/login", { email, password });
      setAuthHeader(res.data.token);
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "users/logOut",
  async (_, thunkApi) => {
    try {
      await axios.post("/users/logout");
      clearAuthHeader();
    } catch (e) {
      return thunkApi.rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);

export const currentAccount = createAsyncThunk(
  "users/currentAccount",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkApi.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get("/users/current");
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response ? e.response.status : e.message);
    }
  }
);

export const fetchAll = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkApi.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/contacts');
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response ? e.response.status : e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkApi) => {
    const state = thunkApi.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkApi.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.post('/contacts', { name, number });
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response ? e.response.status : e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    const state = thunkApi.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkApi.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(persistedToken);
      await axios.delete(`/contacts/${id}`);
      return id;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response ? e.response.status : e.message);
    }
  }
);
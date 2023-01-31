import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
  filtersLoadingStatus: 'idle',
  activeFilter: 'all'
})

// const initialState = {
//   filters: [],
//   filtersLoadingStatus: 'idle',
//   activeFilter: 'all'
// }

// асинхронный редюсер
export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  () => {
    const {request} = useHttp();
    // функция должна вернуть Promise, поэтому добавляем return
    return request("http://localhost:3001/filters")
  }
)

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersSetActive: (state, action) => {state.activeFilter = action.payload}          
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = 'idle';
        filtersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
  }
})

export const {actions, reducer} = filtersSlice;

export default reducer;

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filtersSetActive
} = actions;

// по сути: selectAll = state => state.filters - он же массив фильтров
export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)
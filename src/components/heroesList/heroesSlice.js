import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


const heroesAdapter = createEntityAdapter()

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle'
})

// асинхронный редюсер
export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  // не используем пару async/await, тк в хуке useHttp уже добавлена асинхронность
  () => {
    const {request} = useHttp();
    // функция должна вернуть Promise, поэтому добавляем return
    return request("http://localhost:3001/heroes")
  }
)

const heroesSlice = createSlice({
  // имя слайса
  name: 'heroes',
  initialState,
  reducers: {
    heroCreated: (state, action) => {heroesAdapter.addOne(state, action.payload)},
    heroDeleted: (state, action) => {heroesAdapter.removeOne(state, action.payload)}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = 'idle';
        heroesAdapter.setAll(state, action.payload)
      })
      .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
  }
})

// вытаскиваем из объекта отдельно actions и reducer, далее их экспортируем
const {actions, reducer} = heroesSlice;

export default reducer;

export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted
} = actions;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

// чтобы не дублировать создание selector в разных местах, вынесли сюда
export const filteredHeroesSelector = createSelector(
  state => state.filters.activeFilter,
  // по сути: state => state.heroes - он же массив персонажей
  selectAll,
  (filter, heroes) => {
      if (filter === 'all'){
          return heroes;
      }
      else return heroes.filter(item => item.element === filter)
  }
)
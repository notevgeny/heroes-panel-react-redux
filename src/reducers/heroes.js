// import { createReducer } from "@reduxjs/toolkit"

// import {
//     heroesFetching,
//     heroesFetched,
//     heroesFetchingError,
//     heroCreated,
//     heroDeleted,
// } from '../actions'

// const initialState = {
//   heroes: [],
//   heroesLoadingStatus: 'idle'
// }

// // внутри работает immer, поэтому не паримся на счет прямого изменения state - immer исправит все проблемы иммутабельности
// const reducerHeroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             // если не используем immer или toolkit - так делать нельзя - код не иммутабелен
//             state.heroesLoadingStatus = 'loading';
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus = 'idle';
//             state.heroes = action.payload;
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = 'error'
//         })
//         .addCase(heroCreated, (state, action) => {
//             state.heroes.push(action.payload)
//         })
//         .addCase(heroDeleted, (state, action) => {
//             state.heroes = state.heroes.filter((item) => item.id !== action.payload)
//         })
//         .addDefaultCase(() => {})
// })

// export default reducerHeroes;
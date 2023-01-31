// import { createAction } from "@reduxjs/toolkit";

// асинхронный action с помощью thunk: получение списка героев
// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         .catch(() => dispatch(heroesFetchingError()))
// }

// асинхронный action с помощью thunk: получение списка фильтров
// export const fetchFilters = (request) => (dispatch) => {
//     dispatch(filtersFetching());
//         request("http://localhost:3001/filters")
//             .then(data => dispatch(filtersFetched(data)))
//             .catch(() => dispatch(filtersFetchingError()))
// }


// action creator с помощью createAction
// export const heroesFetching = createAction('HEROES_FETCHING');

// при использовании createAction не нужно передавать payload - аргумент, приходящий в ActionCreator, автоматически приходит в payload
// если добавить дополнительные аргументы, они передаваться не будут
// export const heroesFetched = createAction('HEROES_FETCHED');

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

// export const heroCreated = createAction('HERO_CREATED');

// export const heroDeleted = createAction('HERO_DELETED')


// создаем асинхронную функцию с помощью redux thunk:
// thunk автоматически передает dispatch в возвращаемую функцию

// export const filtersSetActive = (filter) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//             type: 'FILTERS_SET_ACTIVE',
//             payload: filter
//         })
//     }, 1000)
// }



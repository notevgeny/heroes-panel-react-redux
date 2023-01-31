import { configureStore } from '@reduxjs/toolkit';
import heroes from '../components/heroesList/heroesSlice'
import filters from '../components/heroesFilters/filtersSlice';


// middleware занимается расширением dispatch
// почему next а не dispatch - дело в том, что после выполнения dispatch/next запускается цепочка функций из middleware (dispatch-> action и т.д.):
// после выполнения (next) - запуск (action), в котором выполняется также dispatch
const stringMiddleware = ({dispatch, getState}) => (next) => (action) => {
  if (typeof action === 'string'){
    return next({
      type: action
    })
  }
  return next(action)
}

// (он же усилитель store) позволяет обрабатывать в dispatch аргументы, отличные от объекта со свойством type - в данном случае обрабатываем string
// const enhancer = (createStore) => (...args) => {
//   const store = createStore(...args);

//   const oldDispatch = store.dispatch;
//   store.dispatch = (action) => {
//     if (typeof action === 'string'){
//       return oldDispatch({
//         type: action
//       })
//     }
//     return oldDispatch(action)
//   }
//   return store;
// }


// compose позволяет объединить combineReducers с остальными аргументами - без нее работать не будет
// важно учитывать порядок функций - сначала enhancers, затем все остальное (в нашем случае devtools)
// const store = createStore( 
//                 combineReducers({heroes: reducerHeroes, filters: reducerFilters}),
//                 // compose(
//                 //  enhancer,
//                 //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                 // )
//                 compose(
//                   applyMiddleware(thunk, stringMiddleware),
//                   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
//                 )
//               )


const store = configureStore({
  reducer: {
    heroes, 
    filters
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  
})
      

export default store;

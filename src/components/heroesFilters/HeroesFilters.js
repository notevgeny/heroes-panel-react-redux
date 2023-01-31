
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';

import { filtersSetActive, fetchFilters, selectAll } from './filtersSlice';

import Spinner from '../spinner/Spinner';

import classNames from 'classnames';

const HeroesFilters = () => {

    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters)
    const filters = selectAll(store.getState())
    const dispatch = useDispatch();

    // инициализация фильтров при первом рендере страницы
    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);


    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    
    // функция отрисовки фильтров
    const renderFiltersList = (arr) => {

        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        // не забыть return
        return filters.map(({element, label, classname}) => {

            // определяем набор стилей для всех фильтров + стили для активного
            const btnClass = classNames('btn', classname, {
                'active': element === activeFilter
            })

            return <button 
                        key={element} 
                        className={btnClass}
                        onClick={() => dispatch(filtersSetActive(element))}
                        >
                    {label}</button>
        })
    }
    
    const filtersList = renderFiltersList(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filtersList}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
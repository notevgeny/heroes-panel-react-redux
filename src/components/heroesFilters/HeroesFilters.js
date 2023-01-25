
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// + Изменять json-файл для удобства МОЖНО!
// + Представьте, что вы попросили бэкенд-разработчика об этом
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHttp} from '../../hooks/http.hook';

import { fetchFilters, filtersSetActive } from '../../actions';

import Spinner from '../spinner/Spinner';

import classNames from 'classnames';

const HeroesFilters = () => {

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const {request} = useHttp();


    // инициализация фильтров при первом рендере страницы
    useEffect(() => {
        dispatch(fetchFilters(request));
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
                    {/* <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button> */}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
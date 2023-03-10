import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import { heroCreated } from "../heroesList/heroesSlice";
import { selectAll } from "../heroesFilters/filtersSlice";
import store from "../../store";

const HeroesAddForm = () => {

    // достаем из state.filters метод filtersLoadingStatus с помощью useSelector
    // когда интересующее нас значение в store изменяется, useSelector еще и заставляет весь текущий компонент перерисоваться
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState())
    const dispatch = useDispatch();
    const {request} = useHttp();

    const [heroName, setHeroName] = useState('');
    const [heroDesc, setHeroDesc] = useState('');
    const [heroElement, setHeroElement] = useState('');


    const handleAddNewHero = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDesc,
            element: heroElement
        }
        // отправляем запрос на добавление новой записи
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(heroCreated(newHero)))
            .catch((err) => console.error(err))

        // очищаем поля после отправки формы
        setHeroName('');
        setHeroDesc('');
        setHeroElement('');
        
    }
    // отрисовка фильтров
    const renderFilters = (filters, status) => {

        if (status === 'Загрузка'){
            return <option>Загрузка элементов</option>
        }
        else if (status === "error") {
        return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0){
            return filters.map(({element, label}) => {
                // eslint-disable-next-line
                if (element === 'all') return;

                return <option key={element} value={element}>{label}</option>
            })
        }
        
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleAddNewHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    value={heroName} 
                    placeholder="Как меня зовут?"
                    onChange={(e) => setHeroName(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text"
                    value={heroDesc} 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={(e) => setHeroDesc(e.target.value)}
                    />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                    >
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button 
                type="submit" 
                className="btn btn-primary"
                >Создать</button>
        </form>
    )
}

export default HeroesAddForm;
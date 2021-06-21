// libraries
import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

// components
import { Categories, PizzaBlock, PizzaLoadingBlock, SortPopup } from '../components/index'
import { setCategory, setSortBy } from '../redux/actions/filters'

// actions 
import { fetchPizzas } from '../redux/actions/pizzas'
import { addPizzaToBasket } from '../redux/actions/basket'

const categoryNames = ['Beef', 'Chicken', 'Snacks', 'Drinks', 'Sauces']
const sortItems = [
    { name: 'popularity', type: 'popular', order: 'desc' },
    { name: 'price', type: 'price', order: 'desc' },
    { name: 'alphabet', type: 'name', order: 'asc' }
]

function Home() {
    const dispatch = useDispatch()
    const items = useSelector(({ pizzas }) => pizzas.items)
    const basketItems = useSelector(({ basket }) => basket.items)
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded)
    const { category, sortBy } = useSelector(({ filters }) => filters)

    useEffect(() => {
        dispatch(fetchPizzas(sortBy, category))
    }, [category, sortBy])

    const onSelectCategory = useCallback(index => {
        dispatch(setCategory(index))
    }, [])

    const onSelectSortType = useCallback(type => {
        dispatch(setSortBy(type))
    }, [])

    const handleAddPizzaToBasket = obj => {
        dispatch(addPizzaToBasket(obj))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={category} items={categoryNames} onClickCategory={onSelectCategory} />
                <SortPopup activeSortType={sortBy.type} items={sortItems} onClickSortType={onSelectSortType} />
            </div>
            <h2 className="content__title">ALL BURGERS</h2>
            <div className="content__items">
                {isLoaded ? items.map(pizza =>  { return <PizzaBlock {...pizza} addedCount={basketItems[pizza.id] && basketItems[pizza.id].items.length} onClickAddPizza={handleAddPizzaToBasket} key={pizza.id} /> }) : Array(53).fill(0).map((_, index) => {
                    return <PizzaLoadingBlock key={index} />
                })}
            </div>
        </div>
    )
}

Home.propTypes = {
    pizzas: PropTypes.arrayOf(PropTypes.object).isRequired
}

Home.defaultProps = {
    pizzas: []
}

export default Home
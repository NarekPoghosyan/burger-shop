export const setLoaded = payload => ({
    type: 'SET_LOADED',
    payload,
})

export const fetchPizzas = (sortBy, category,) => async dispatch => {
    dispatch(setLoaded(false))
    const response = await fetch(`/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
    const data = await response.json()
    dispatch(setPizzas(data))
}

export const setPizzas = (items) => ({
    type: 'SET_PIZZAS',
    payload: items
})

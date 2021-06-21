export const addPizzaToBasket = (pizzaObj) => ({
    type: 'ADD_PIZZA_BASKET',
    payload: pizzaObj
})

export const clearBasket = () => ({
    type: 'CLEAR_BASKET'
})

export const removeBasketItem = id => ({
    type: 'REMOVE_BASKET_ITEM',
    payload: id
})

export const plusBasketItem = id => ({
    type: 'PLUS_BASKET_ITEM',
    payload: id
})

export const minusBasketItem = id => ({
    type: 'MINUS_BASKET_ITEM',
    payload: id
})
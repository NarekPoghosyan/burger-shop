const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0
};

const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0)

const _get = (obj, path) => {
    const [firstKey, ...keys] = path.split('.')
    return keys.reduce((val, key) => {
        return val[key]
    }, obj[firstKey])
}

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = _get(obj, path)
        return sum + value;
    }, 0)
}

const basket = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PIZZA_BASKET':
            const currentPizzaItems = !state.items[action.payload.id] ? [action.payload] : [...state.items[action.payload.id].items, action.payload]
            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems)
                },
            };

            const totalCount = getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems, 'totalPrice')

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            }

        case 'REMOVE_BASKET_ITEM': {
            const newItems = {
                ...state.items
            }
            const currentTotalPrice = newItems[action.payload].totalPrice
            const currentTotalCount = newItems[action.payload].items.length
            delete newItems[action.payload]
            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            }
        }

        case 'CLEAR_BASKET':
            return {
                items: {},
                totalPrice: 0,
                totalCount: 0
            }

        case 'MINUS_BASKET_ITEM':
            const oldItems = state.items[action.payload].items
            const newMinusItems =
                oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems

            const newItemsAfterMinus = {
                ...state.items,
                [action.payload]: {
                    items: newMinusItems,
                    totalPrice: getTotalPrice(newMinusItems)
                }
            }

            const totalCountAfterMinus = getTotalSum(newItemsAfterMinus, 'items.length')
            const totalPriceAfterMinus = getTotalSum(newItemsAfterMinus, 'totalPrice')

            const newStateAfterMinus = {
                ...state,
                items: newItemsAfterMinus,
                totalCount: totalCountAfterMinus,
                totalPrice: totalPriceAfterMinus
            }

            return newStateAfterMinus

        case 'PLUS_BASKET_ITEM':
            const newPlusItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ];

            const newItemsAfterPlus = {
                ...state.items,
                [action.payload]: {
                    items: newPlusItems,
                    totalPrice: getTotalPrice(newPlusItems)
                },
            }

            const totalCountAfterPlus = getTotalSum(newItemsAfterPlus, 'items.length')
            const totalPriceAfterPlus = getTotalSum(newItemsAfterPlus, 'totalPrice')

            const newStateAfterPlus = {
                ...state,
                items: newItemsAfterPlus,
                totalCount: totalCountAfterPlus,
                totalPrice: totalPriceAfterPlus
            }

            return newStateAfterPlus
        default:
            return state;
    }
}

export default basket;
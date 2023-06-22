const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const combineReducers = redux.combineReducers
const logger = reduxLogger.createLogger()

const BUY_PRODUCT = 'BUY_PRODUCT'
const BUY_CATEGORY = 'BUY_CATEGORY'

function buyProduct() {
    return {
        type: BUY_PRODUCT
    }
}

function buyCategory() {
    return {
        type: BUY_CATEGORY
    }
}

const initialState = {
    noOfProducts:200,
    noOfCategories:40
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BUY_PRODUCT':
            return {
                ...state,
                noOfProducts:state.noOfProducts-2
            }
        case 'BUY_CATEGORY':
            return {
                ...state,
                noOfCategories:state.noOfCategories-1
            }
        default:
            return state
    }
}

const store = createStore(reducer)

console.log('Initial state:', store.getState())

const unsubscribe = store.subscribe(() => {
    console.log('Updated state:', store.getState())
})

store.dispatch(buyProduct())
store.dispatch(buyCategory())
store.dispatch(buyCategory())
store.dispatch(buyCategory())
store.dispatch(buyProduct())

unsubscribe()

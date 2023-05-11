const redux=require('redux')
const reduxLogger=require('redux-logger')

const createStore=redux.createStore
const combineReducers=redux.combineReducers
const applyMiddleware=redux.applyMiddleware
const logger=reduxLogger.createLogger()

const BUY_CAKE='BUY_CAKE'
const BUY_ICECREAM='BUY_ICECREAM'

function buyCake(){
    return{
        type:BUY_CAKE,
        info:'first redux'
    }
}
function buyIceCream(){
    return{
        type:BUY_ICECREAM,
        info:'first redux'
    }
}
const initialCakeState={
    numberOfCake:20,
}
const initialIceCreamState={
    numberOfIceCream:30

}
const cakeReducer=(state=initialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
        numberOfCake:state.numberOfCake-1
        
        }
        default:return state
    }
}

const IcecCreamReducer=(state=initialIceCreamState,action)=>{
    switch(action.type){
case BUY_ICECREAM: return{
    ...state,
numberOfIceCream:state.numberOfIceCream-1

}
default:return state
}
}

const rootReducer=combineReducers({
   cake:cakeReducer,
   iceCream:IcecCreamReducer 
})
const store=createStore(rootReducer,applyMiddleware(logger))
console.log('Initial state',store.getState()) 
// const unsubscribe=store.subscribe(()=>console.log('Update state',store.getState()))
const unsubscribe=store.subscribe(()=>{})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyCake())
unsubscribe();




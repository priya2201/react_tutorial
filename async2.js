const redux=require('redux')
const thunkMiddleware=require('redux-thunk').default
const createStore=redux.createStore
const applyMiddleware=redux.applyMiddleware
const axios=require('axios')

const initialState={
    loading:false,
    posts:[],
    error:''
}

const FETCH_REQUEST='FETCH_REQUEST'
const FETCH_FAILURE='FETCH_FAILURE'
const FETCH_SUCCESS='FETCH_SUCCESS'

const fetchRequest=()=>{
    return{
        type:FETCH_REQUEST
    }
}
const fetchSuccess=(posts)=>{
    return{
        type:FETCH_SUCCESS,
        payload:posts
    }
}

const fetchFailure=(error)=>{
    return{
        type:FETCH_FAILURE,
        payload:error
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_REQUEST:{
return{
    ...state,
    loading:true
}
        }
        case FETCH_SUCCESS:{
            return{
                loading:false,
                posts:action.payload,
                error:''
            }
        }
        case FETCH_FAILURE:{
            return{
                loading:false,
                posts:[],
                error:action.payload
            }
        }
    }
}

const fetchUsersNow=()=>{
return function (dispatch){
    dispatch(fetchRequest())
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response=> {
        const users=response.data.map(user => user.title)
        dispatch(fetchSuccess(users))
    })
    .catch(error =>{
        dispatch(fetchFailure(error.message))
    })
}
}

const store=createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(()=> {console.log(store.getState())})
store.dispatch(fetchUsersNow())

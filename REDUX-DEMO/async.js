const redux = require('redux')
const createStore = redux.legacy_createStore;
const thunkMiddlware = require('redux-thunk').default
const applyMiddlware = redux.applyMiddleware;
const axios = require('axios')


// intialstate
const intialState = {
    loading:false,
    users:[],
    error:''
}

// action creators
const fetchUserRequest = () => {
    return {
        type:"FETCH_USERS_REQUESTED"
    }
}

const successFromApi = (users) => {
    return {
        type:"FETCH_USERS_SUCCESS",
        payload:users
    }
}

const errorFromApi = (error) => {
    return {
        type:"FETCH_USERS_FAILED",
        payload:error
    }
}

// reducer function to handle state and action 
const reducer = (state = intialState, action) => {
   switch (action.type) {
       case "FETCH_USERS_REQUESTED":
        return {
            ...state,
            loading:true
        }
        case "FETCH_USERS_SUCCESS":
        return {
            ...state,
            loading:false,
            users : action.payload
        }
        case "FETCH_USERS_FAILED":
        return {
            ...state,
            loading:false,
            error:action.payload
        }         
         
   
       default:
           state;
   }
}

const fetchUsers= () => {
   return function(dispatch){
       dispatch(fetchUserRequest())
      axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
       const users = response.data.map((user) => user.id)
       dispatch(successFromApi(users))
       }).catch((error) => {
           dispatch(errorFromApi(error.message))

       })
   }
}


const store = createStore(reducer,applyMiddlware(thunkMiddlware));

store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())
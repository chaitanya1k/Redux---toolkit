const redux = require('redux')
const combinedReducer = redux.combineReducers
const createStore = redux.legacy_createStore;
const bindingActionCreators = redux.bindActionCreators;
const applyMiddleware = redux.applyMiddleware

const redxuLogger = require('redux-logger')
const logger = redxuLogger.createLogger()

// IntialState of cakes
const intialCakeState = {
    numberOfCakes: 10,
}
// IntialState of icecreams
const intialIcecreamState = {
    numberOfIcecreams: 20
}


//cake 
const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCK = "CAKE_RESTOCK"
//Ice creams
const ICECREAMS_ORDERD = 'ICECREAM_ORDERED'
const ICECREAMS_RESTOCK = 'ICECREAM_RESTOCK'

// action creators cake order
function orderCake(qty =1) {
    return {
        type: CAKE_ORDERED,
        payload: qty
    }
}
// action creators cake restock.
function restockCake(qty = 1) {
    return {
        type: CAKE_RESTOCK,
        payload: qty
    }
}

// action creators ice orders
function orderIcecream(qty = 1) {
    return {
        type: ICECREAMS_ORDERD,
        payload: qty
    }
}
// action creators ice restock
function restockIcrem(qty) {
    return {
        type: ICECREAMS_RESTOCK,
        payload: qty
    }
}



// reducer of cakes
const reducerforCakes = (state = intialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - action.payload
            }
        case CAKE_RESTOCK:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes + action.payload,
            }

        default:
            return state;
    }
}

// reducer of Icecreams
const reducerForIcecrems = (state = intialIcecreamState, action) => {
    switch (action.type) {
        case ICECREAMS_ORDERD:
            return {
                ...state,
                numberOfIcecreams: state.numberOfIcecreams - action.payload
            }
        case ICECREAMS_RESTOCK:
            return {
                ...state,
                numberOfIcecreams: state.numberOfIcecreams + action.payload
            }
        default:
            return state;
    }
}

// combined reducer
const combine = combinedReducer({ cake:reducerforCakes, icecream:reducerForIcecrems })


const store = createStore(combine,applyMiddleware(logger));

console.log('intialState', store.getState());

const unsubscribe = store.subscribe(() => {})

//    store.dispatch(orderCake())
//    store.dispatch(orderCake())
//    store.dispatch(orderCake())
//    store.dispatch(restockCake(3))

const actions = bindingActionCreators({ orderCake, restockCake, orderIcecream, restockIcrem }, store.dispatch)

actions.orderCake();
actions.orderIcecream()
actions.orderCake();
actions.orderCake();
actions.orderIcecream()
actions.restockCake(3);
actions.orderIcecream()
actions.orderIcecream()
actions.orderIcecream()
actions.orderIcecream()
actions.restockIcrem(4)




unsubscribe()
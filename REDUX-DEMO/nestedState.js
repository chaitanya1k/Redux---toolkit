const redux = require('redux')
const produce = require('immer').produce
const createStore = redux.legacy_createStore

 

const intialState = {
    name: 'vishwas',
    address: {
        street: "12th main, 2nd cross",
        area: 'Jayanagar',
        state: 'ka'
    }
}

const streetUpdate = (street) => {
    return {
        type: "STREET_UPDATE",
        payload: street
    }
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case "STREET_UPDATE":
            return produce(state, (draft) => {
                  draft.address.street = action.payload
            })

        default:
            state;
    }
}

const store =createStore(reducer)

 console.log("intialState", store.getState())

const unsubscribe = store.subscribe(() => console.log("updatedState", store.getState()))

store.dispatch(streetUpdate('1st street'))

unsubscribe();
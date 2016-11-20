import { createAction, handleActions } from 'redux-action'

export const DD_ACTION = 'DD_ACTION';
export const DG_ACTION = 'DG_ACTION';
export const T_ACTION = 'T_ACTION';


const ddAction = createAction( DD_ACTION, data => data );

const dgAction = createAction( DG_ACTION, data => data );

const tAction = createAction( T_ACTION, (data) => {
    // ...
    return Promise.resolve(data)
})



export const actions = {
    dd: ddAction,
    dg: dgAction,
    t: tAction,
};

//Actions that need dispatch reference
export const complexActions = {

};

//All actions
export const allActions = {
    ...actions,
    ...complexActions,
};


const initialState = {
// Initial State goes here!
};

const ttReducer = handleActions({
    DD_ACTION: (state, action) => {
        return state;
    },
    DG_ACTION: (state, action) => {
        return state;
    },
    T_ACTION: (state, action) => {
        return state;
    },
}, initialState)

export default ttReducer;

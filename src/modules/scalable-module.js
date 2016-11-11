import { createAction } from 'redux-action'

export const DEFAULT_ACTION = 'DEFAULT_ACTION';
export const DEFAULT_ASYNC_ACTION = 'DEFAULT_ASYNC_ACTION';


const DefaultAction = createAction( DEFAULT_ACTION, data => data );

const DefaultAsyncAction = createAction( DEFAULT_ASYNC_ACTION, (data) => {
    // ...
    return Promise.resolve(data)
})



export const actions = {
    DefaultAction,
    DefaultAsyncAction,
};


const initialState = {
  // Initial State goes here!
};

const scalableReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;
        case DEFAULT_ASYNC_ACTION:
            return state;
    }
};

export default scalableReducer;

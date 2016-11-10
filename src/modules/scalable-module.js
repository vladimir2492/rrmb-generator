export const SCALABLE_ACTION = 'SCALABLE_ACTION';

export const scalableAction = () => ({
  type: SCALABLE_ACTION,
});


const initialState = {
  // Initial State goes here!
};

const scalableReducer =
  (state = initialState, action) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        return state;
      default:
        return state;
    }
};

export default scalableReducer;



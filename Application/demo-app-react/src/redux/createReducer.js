import Immutable from 'seamless-immutable';

const isNil = value => value === null || value === undefined;

/* eslint-disable no-param-reassign */
export default (initialState, handlers) => {
  // initial state is required
  if (isNil(initialState)) {
    throw new Error('initial state is required');
  }

  // create the reducer function
  return (state = initialState, action) => {
    if (process.env.NODE_ENV === 'development') {
      state = Immutable.isImmutable(state) ? state : Immutable(state);
    }

    // wrong actions, just return state
    if (isNil(action) || isNil(handlers[action.type])) {
      return state;
    }

    // look for the handler
    const handler = handlers[action.type];

    // no handler no cry
    if (isNil(handler)) {
      return state;
    }

    // execute the handler
    return handler(state, action);
  };
};

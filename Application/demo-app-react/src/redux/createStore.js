import { compose, createStore } from 'redux';

// creates the store
export default (rootReducer) => {
  /* ------------- Redux Configuration ------------- */

  const enhancers = [];


  /* ------------- Assemble Middleware ------------- */

  let composeEnhancers = compose;

   /* eslint-disable no-underscore-dangle */
   if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const store = createStore(rootReducer, composeEnhancers(...enhancers));

  return store;
};

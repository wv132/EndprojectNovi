import { combineReducers } from 'redux';

import configureStore from './createStore';

/* Reducers */
import { reducer as UserAuth } from './User';

const rootReducer = combineReducers({
  user: UserAuth,
});

const store = configureStore(rootReducer);

export default store;

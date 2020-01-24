import createReducer from '../createReducer';
import * as types from './User.types';
import * as reducers from './User.reducers';
import { INITIAL_STATE } from './User.state';

export const reducer = createReducer(INITIAL_STATE, {
  [types.SET_USER]: reducers.setUser,
  [types.LOGOUT]: reducers.logout,
});

import * as types from './User.types';


export const setUser = user => ({
  type: types.SET_USER,
  user
});

export const logout = () => ({
  type: types.LOGOUT
});
import { INITIAL_STATE } from './User.state';

export const setUser = (state, { user }) =>
  state.merge({
    user,
  });

export const logout = state => state.set(INITIAL_STATE);

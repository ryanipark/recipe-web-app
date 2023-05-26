import { SET_USER , LOGOUT_USER } from './types';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      username: user.username,
      email: user.email,
      created_at: user.created_at
    },
  };
};

export function logout() {
  return {
    type: LOGOUT_USER
  }
}

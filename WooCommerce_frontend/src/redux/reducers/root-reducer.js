import signUp from './signUp';
import login from './login';
import user from './user';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  signUp,
  login,
  user
});

const initialState = {
  signUp: {
  },
  login: {
  },
  user: {
  }
}

const rootReducer = (state = initialState, action) => {
   return appReducer(state, action);
};

export default rootReducer;

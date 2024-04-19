/* eslint-disable prettier/prettier */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable default-param-last */
/* eslint-disable prettier/prettier */
import { applyMiddleware, createStore, compose } from 'redux';
import { thunk } from 'redux-thunk';

const loggerMiddleware = (store) => (next) => (action) => {
  console.log('old state', store.getState());
  const result = next(action);
  console.log('New state:', store.getState());
  return result;
};
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let token = '';

if (localStorage.logedToken) {
  if (localStorage.logedToken.length > 0) {
    token = localStorage.logedToken;
  }
}

const defaultState = {
  token,
  message: 'Yes, you can',
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'setToken': return {...state, token: action.payload};
    case 'logout': return {...state, token: ''};
    default:
      return state;
  }
};
const store = createStore(reducer, composeEnhancers(applyMiddleware(loggerMiddleware, thunk)));

export default store;

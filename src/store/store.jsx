/* eslint-disable prettier/prettier */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable default-param-last */
/* eslint-disable prettier/prettier */
import { applyMiddleware, createStore, compose } from 'redux';
import { thunk } from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let token = '';

if (localStorage.logedToken) {
  if (localStorage.logedToken.length > 0) {
    token = localStorage.logedToken;
  }
}

const defaultState = {
  token,
  name: '',
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'setToken':
      return { ...state, token: action.payload };
    case 'logout':
      return { ...state, token: '' };
    case 'setName':
      return { ...state, name: action.payload };
    default:
      return state;
  }
};
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

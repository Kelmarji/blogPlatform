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

const defaultState = {
  message: 'Yes, you can',
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const store = createStore(reducer, composeEnhancers(applyMiddleware(loggerMiddleware, thunk)));

export default store;

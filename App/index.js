import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { topReducer } from './model.js';
import { TreeApp } from './view.js'; 
import { serverConn } from './serverConn.js';

let createStore2 = applyMiddleware(serverConn)(createStore)
let store = createStore2(topReducer);

ReactDOM.render(
  <Provider store={store}>
    <TreeApp/>
  </Provider>,
  document.getElementById('root')
);

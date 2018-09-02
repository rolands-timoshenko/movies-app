import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { ReduxApp } from './App';
import './index.css';
import { configureStore } from "./store/Store";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ReduxApp />
  </Provider>
, document.getElementById('root'));

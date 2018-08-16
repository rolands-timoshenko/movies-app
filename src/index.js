import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import registerServiceWorker from './registerServiceWorker';
import { RootStore } from './models/RootStore';
import { Provider } from "mobx-react";

const rootStore = RootStore.create();

ReactDOM.render(
    <Provider rootStore={rootStore}>
      <App />
    </Provider>
  , document.getElementById('root'));
// TODO: enable when needed 
// registerServiceWorker(); 

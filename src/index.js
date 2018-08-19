import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import registerServiceWorker from './registerServiceWorker';
import { RootStore } from './models/RootStore';
import { Provider } from "mobx-react";
import { asReduxStore, connectReduxDevtools } from "mst-middlewares";

const rootStore = RootStore.create();

// Lets add redux devtool so we can debug store
asReduxStore(rootStore);
connectReduxDevtools(require("remotedev"), rootStore);

ReactDOM.render(
    <Provider rootStore={rootStore}>
      <App />
    </Provider>
  , document.getElementById('root'));
// TODO: enable when needed 
// registerServiceWorker(); 

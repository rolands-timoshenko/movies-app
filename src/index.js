import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import registerServiceWorker from './registerServiceWorker';
import { RootStore } from './models/RootStore';
import { Provider } from "mobx-react";
import { asReduxStore, connectReduxDevtools } from "mst-middlewares";
import { BrowserRouter } from 'react-router-dom';
import $ from 'jquery';

const rootStore = RootStore.create();

// Lets add redux devtool so we can debug store
asReduxStore(rootStore);
connectReduxDevtools(require("remotedev"), rootStore);


const Button = () => <button id="btn">Click me</button>;

class Test extends Component {
  render() {
    return <h1>Testing</h1>;
  }
}


ReactDOM.render(
  <Button />,
  document.getElementById('root'),
  () => {
    $('#btn').click(() => {
      ReactDOM.createPortal(<Test />, document.getElementById("test"));
    });
  }
);

// ReactDOM.render(
//     <Provider rootStore={rootStore}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   , document.getElementById('root'));
// TODO: enable when needed 
// registerServiceWorker(); 

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MovieStore from './models/Movies';

const moviesStore = MovieStore.create();

ReactDOM.render(<App store={moviesStore} />, document.getElementById('root'));
registerServiceWorker();

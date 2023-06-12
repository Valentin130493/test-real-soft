import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import {store} from "./store";
import {App} from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/index.scss';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>,
);

reportWebVitals();

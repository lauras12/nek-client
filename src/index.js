import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {TrailContextProvider} from './Context';

ReactDOM.render(
    <BrowserRouter>
         <TrailContextProvider>
                    <App />
            </TrailContextProvider>
    </BrowserRouter>,
    
    document.getElementById('root')
);

serviceWorker.unregister();
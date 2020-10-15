import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import {HikeContextProvider} from './Context';

ReactDOM.render(
    <BrowserRouter>
         <HikeContextProvider>
                    <App />
            </HikeContextProvider>
    </BrowserRouter>,
    
    document.getElementById('root')
);


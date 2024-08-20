import logger from 'redux-logger';
import {thunk} from 'redux-thunk'; // thunkMiddleware olarak içe aktarın

import { applyMiddleware, createStore } from 'redux'; // applyMiddleware ve createStore doğru şekilde içe aktarın
import reducer from './Reducer';

const store = createStore(reducer, applyMiddleware(logger, thunk)); // Middleware'leri bir dizi içinde belirtin

export default store;

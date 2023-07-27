import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import ContainerPage from './components/ContainerPage';
import UserService from './services/UserService';
import rootReducer from './modules';
//import UserService from './services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// eslint-disable-next-line
import $ from 'jquery';
// eslint-disable-next-line
import Popper from 'popper.js';

const _axios = axios.create();
_axios.interceptors.request.use((config) => {
  if (UserService.isLoggedIn()) {
    const cb = () => {
      config.headers.Authorization = `Bearer ${UserService.getToken()}`;
      return Promise.resolve(config);
    };
    return UserService.updateToken(cb);
  }
});


//REDUX STORE

const _middleware = applyMiddleware(thunk, axiosMiddleware(_axios));
const store = createStore(rootReducer, _middleware);
const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => root.render(<ContainerPage store={store} />);
UserService.initKeycloak(renderApp);

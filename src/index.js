// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

//kepler example code
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import keplerGlReducer from 'kepler.gl/reducers';
import App from './App';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk"
import {taskMiddleware} from 'react-palm/tasks';
import reportWebVitals from './reportWebVitals';
import {enhanceReduxMiddleware} from 'kepler.gl/middleware';
import reducer from './reducers/index'

// const reducer = combineReducers({
//   // <-- mount kepler.gl reducer in your app
//   keplerGl: keplerGlReducer,

//   // Your other reducers here
//   // app: appReducer

// create store
// const store = createStore(reducer, {}, applyMiddleware(taskMiddleware));
// const initialState = {
// 	mapStyle:{
//     id: 'nanbette',
//     label: 'nanette',
//     // url: 'mapbox://styles/mapbox/navigation-guidance-day-v4',
//     url: 'mapbox://styles/nanhosen/ckcxziwe017vi1imsnzt1aucp',
//     // url: 'https://api.mapbox.com/styles/v1/nanhosen/ckcxziwe017vi1imsnzt1aucp.html?fresh=true&title=copy&access_token=pk.eyJ1IjoibmFuaG9zZW4iLCJhIjoiY2ppZGExdDZsMDloNzN3cGVoMjZ0NHR5YyJ9.RYsPZGmajXULk-WtqvBNpQ'
//     layerGroups: [] // DEFAULT_LAYER_GROUPS
//   }
// }
//   const initState1 = {
//     mapStyle: {
//       styleType: 'light'
//     }
//   }
const store = createStore(reducer, {}, applyMiddleware(thunk, taskMiddleware));
// const store = createStore(
//   reducer,
//   initialState,
//   applyMiddleware(
//     enhanceReduxMiddleware([
//       taskMiddleware
//     ])
//   )
// );

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
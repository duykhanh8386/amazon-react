import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducers';
const root = ReactDOM.createRoot(document.getElementById('root'));
//Dùng local storage để lưu trữ giỏ hàng tránh bị render mất,
const persistedState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
const store = createStore(
  allReducers,
  { cartReducer: persistedState },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cartReducer));
});

root.render(
 <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

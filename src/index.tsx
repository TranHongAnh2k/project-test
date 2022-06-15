import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import storage from "redux-persist/lib/storage";
import logger from 'redux-logger'
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createSagaMiddleware from "redux-saga";
import rootReducers from "./redux/reducers";
import rootSagas from "./redux/sagas";
import { Provider } from 'react-redux';
import App from "./layouts"
// persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [""]
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

// add middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [];
middleware.push(sagaMiddleware)
middleware.push(logger);

// create store in redux
export const store = createStore(
  persistedReducer,
  applyMiddleware(...middleware)
);
const persistor = persistStore(store);
sagaMiddleware.run(rootSagas);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

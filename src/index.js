import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

//router imports
import { BrowserRouter as Router } from "react-router-dom";

//redux imports
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import reducers from "redux/reducer";
import persistConfig from "config/persistorConfig";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "redux/sagas";

//page
import App from "./App";

//sass
import "./index.scss";

const middleWares = [];

const sagaMiddleware = createSagaMiddleware();

const pReducer = persistReducer(persistConfig, reducers(reducers));
export const store = createStore(
  pReducer,
  compose(applyMiddleware(...middleWares), applyMiddleware(sagaMiddleware))
);

const pStore = persistStore(store);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={pStore}>
      {/* <React.StrictMode> */}
      <Router>
        <App />
      </Router>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

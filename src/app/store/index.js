import { createStore, applyMiddleware, combineReducers } from "redux";
import { defaultState } from "../../server/defaultState";
import { createLogger } from "redux-logger";
import { reducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import { loadingBarMiddleware } from "react-redux-loading-bar";

const sagaMiddleware = createSagaMiddleware();
import * as sagas from "./sagas";
import * as actions from "./actions";

// Create store will take the combineReducers from reducer and connect with
// sagaMiddleware and the loadingBar.
export const store = createStore(
  reducer,
  applyMiddleware(loadingBarMiddleware(), sagaMiddleware)
);

// Triggers all sagas to run.
for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

import { createStore, applyMiddleware, combineReducers } from "redux";
import { defaultState } from "../../server/defaultState";
import { createLogger } from "redux-logger";
import { reducer } from "./reducers";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
import * as sagas from "./sagas";
import * as actions from "./actions";

export const store = createStore(
  reducer,
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

import { take, put, select } from "redux-saga/effects";
import uuid from "uuid";
import axios from "axios";
import * as mutations from "./mutations";
import { history } from "./history";
const url = "http://localhost:7777";

export function* addToFavoritesSaga() {
  while (true) {
    const { userID, movie } = yield take(mutations.ADD_TO_FAVORITES);
    const { data } = yield axios.post(url + `/favorites/add`, {
      userID,
      movie
    });
    yield put(mutations.setState(data.state));
  }
}

export function* userCreationSaga() {
  while (true) {
    const { username, password } = yield take(mutations.REQUEST_USER_CREATION);
    try {
      const { data } = yield axios.post(url + `/user/create`, {
        username,
        password
      });
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
      history.push("/movies");
    } catch (e) {
      // If error put not-authenticated to state
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(url + `/authenticate`, {
        username,
        password
      });
      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
      history.push("/movies");
    } catch (e) {
      // If error put not-authenticated to state
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}

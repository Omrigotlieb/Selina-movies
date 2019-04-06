import { take, put, select } from "redux-saga/effects";
import uuid from "uuid";
import axios from "axios";
import * as actions from "./actions";
import { history } from "./history";
const url = "http://localhost:7777";
const moviesAPIURL = "https://api.themoviedb.org/3/movie/now_playing?";

// export function* getLatestMoviesSaga() {
//   while (true) {
//     const { page, language, key } = yield take(actions.GET_LATEST_MOVIES);
//     const movies = yield fetch(
//       `${moviesAPIURL}api_key=${key}&language=${language}&page=${page}`
//     ).then(response => response.json());
//     console.log("movies", movies);
//
//     yield put(actions.setState({ movies }));
//   }
// }

export function* removeFromFavoritesSaga() {
  while (true) {
    const { userID, movie } = yield take(actions.REMOVE_FROM_FAVORITES);
    const { data } = yield axios.post(url + `/favorites/remove`, {
      userID,
      movie
    });
    yield put(actions.setState(data.state));
  }
}

export function* addToFavoritesSaga() {
  while (true) {
    const { userID, movie } = yield take(actions.ADD_TO_FAVORITES);
    const { data } = yield axios.post(url + `/favorites/add`, {
      userID,
      movie
    });
    yield put(actions.setState(data.state));
  }
}

export function* userCreationSaga() {
  while (true) {
    const { username, password } = yield take(actions.REQUEST_USER_CREATION);
    try {
      const { data } = yield axios.post(url + `/user/create`, {
        username,
        password
      });
      yield put(actions.setState(data.state));
      yield put(actions.processAuthenticateUser(actions.AUTHENTICATED));
      yield put(actions.setState(data.state));
      history.push("/movies");
    } catch (e) {
      // If error put not-authenticated to state
      yield put(actions.processAuthenticateUser(actions.NOT_AUTHENTICATED));
    }
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      actions.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(url + `/authenticate`, {
        username,
        password
      });
      yield put(actions.setState(data.state));
      yield put(actions.processAuthenticateUser(actions.AUTHENTICATED));
      yield put(actions.setState(data.state));
      history.push("/movies");
    } catch (e) {
      // If error put not-authenticated to state
      yield put(actions.processAuthenticateUser(actions.NOT_AUTHENTICATED));
    }
  }
}

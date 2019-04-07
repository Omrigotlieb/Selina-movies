import { take, put, select } from "redux-saga/effects";
import {
  showLoading,
  hideLoading,
  resetLoading
} from "react-redux-loading-bar";
import uuid from "uuid";
import axios from "axios";
import * as actions from "./actions";
import { history } from "./history";
const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:7777";
const moviesAPIURL = "https://api.themoviedb.org/3/movie/now_playing?";

// This saga will wait for an action of GET_LATEST_MOVIES,
// will fetch form tmdb API and will set state for the new movies.
export function* getLatestMoviesSaga() {
  while (true) {
    const { language, key, page, state } = yield take(
      actions.GET_LATEST_MOVIES
    );
    try {
      yield put(showLoading());
      const response = yield fetch(
        `${moviesAPIURL}api_key=${key}&language=${language}&page=${page}`
      ).then(res => res.json());
      const movies = response.results;

      yield put(actions.setState({ ...state, movies: movies }));
    } catch (e) {
      // Todo implement fetchFaild
      // yield put(actions.fetchFailed(e));
      // return ;
    }
  }
}

// This saga will wait for an action of REMOVE_FROM_FAVORITES and post to the server
// which movie to remove from userID favorites array.
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

// This saga will wait for an action of ADD_TO_FAVORITES and post to the server
// which movie to add to the userID favorites array.
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

// This saga will wait for an action of REQUEST_USER_CREATION and post to the server
// which will create a new user in db.
export function* userCreationSaga() {
  while (true) {
    const { username, password } = yield take(actions.REQUEST_USER_CREATION);
    try {
      const { data } = yield axios.post(url + `/user/create`, {
        username,
        password
      });

      //todo delete double set state
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

// This saga will wait for an action of REQUEST_AUTHENTICATE_USER and post to the server
// which will authenticate the user in the db with the username and password.
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
      //todo delete double set state
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

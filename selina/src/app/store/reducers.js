import { combineReducers } from "redux";
import * as actions from "./actions";

let defaultState = {
  session: {},
  favorites: [],
  users: [],
  movies: []
};

export const reducer = combineReducers({
  session(userSession = defaultState.session, action) {
    let { type, authenticated, admin } = action;
    const session = (action && action.state && action.state.session) || [];
    switch (type) {
      case actions.SET_STATE:
        const id =
          (userSession && userSession.id) ||
          (action.state.session && action.state.session.id);
        const admin = (session && session.admin) || userSession.admin || false;
        const otherUsers =
          (session && session.otherUsers) ||
          (userSession && userSession.otherUsers) ||
          [];
        return { ...userSession, id, admin, otherUsers };
      case actions.REQUEST_USER_CREATION:
        return { ...userSession, authenticated: actions.AUTHENTICATED };
      case actions.REQUEST_AUTHENTICATE_USER:
        return { ...userSession, authenticated: actions.AUTHENTICATING };
      case actions.PROCESSING_AUTHENTICATE_USER:
        return { ...userSession, authenticated };
      default:
        return userSession;
    }
  },

  movies(movies = defaultState.movies, action) {
    let { type, page, state } = action;
    movies = state
      ? state.movies
        ? state.movies
        : movies.length
        ? movies
        : []
      : [];
    switch (type) {
      case actions.SET_STATE:
        return movies;
      case actions.GET_LATEST_MOVIES:
        return movies;
      default:
        return movies;
    }
  },

  favorites(favorites = [], action) {
    let { userID, movie, state = defaultState } = action;
    switch (action.type) {
      case actions.SET_STATE:
        return (
          (action.state.usersCollection &&
            action.state.usersCollection[0].favorites) ||
          favorites
        );
      case actions.ADD_TO_FAVORITES:
        return [...favorites, movie];
      case actions.REMOVE_FROM_FAVORITES:
        favorites = favorites.filter(item => item.id !== movie.id);
        return favorites;
      case actions.PROCESSING_AUTHENTICATE_USER:
        favorites = favorites || action.state.usersCollection[0].favorites;
        return favorites;
      default:
        return favorites;
    }
  }
});

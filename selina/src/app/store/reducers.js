import { combineReducers } from "redux";
import * as actions from "./actions";

let defaultState = {
  session: {},
  favorites: [],
  users: []
};

export const reducer = combineReducers({
  session(userSession = defaultState.session, action) {
    let { type, authenticated, session } = action;
    switch (type) {
      case actions.SET_STATE:
        let id = userSession.id || action.state.session.id;
        return { ...userSession, id};
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
  // movies(movies = [], action) {
  //   let { type, latestMovies, page } = action;
  //   switch (type) {
  //     case actions.SET_STATE:
  //       return action.state.movies || movies;
  //     case actions.GET_LATEST_MOVIES:
  //       let movies = latestMovies;
  //       return { movies };
  //     default:
  //       return movies;
  //   }
  // },

  favorites(favorites = [], action) {
    let { userID, movie } = action;
    debugger;
    switch (action.type) {
      case actions.SET_STATE:
        return action.state.usersCollection && action.state.usersCollection[0].favorites || favorites;
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

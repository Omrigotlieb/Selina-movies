import { combineReducers } from "redux";
import * as mutations from "./mutations";

let defaultState = {
  session: {},
  favorites: [],
  users: []
};

export const reducer = combineReducers({
  session(userSession = defaultState.session, action) {
    let { type, authenticated, session } = action;
    switch (type) {
      case mutations.SET_STATE:
        return { ...userSession, id: action.state.session.id };
      case mutations.REQUEST_USER_CREATION:
        return { ...userSession, authenticated: mutations.AUTHENTICATED };
      case mutations.REQUEST_AUTHENTICATE_USER:
        return { ...userSession, authenticated: mutations.AUTHENTICATING };
      case mutations.PROCESSING_AUTHENTICATE_USER:
        return { ...userSession, authenticated };
      default:
        return userSession;
    }
  },
  favorites(favorites = [], action) {
    let { userID, movie } = action;
    switch (action.type) {
      case mutations.SET_STATE:
        return action.state.favorites || favorites;
      case mutations.ADD_TO_FAVORITES:
        return [...favorites, movie];
      case mutations.REMOVE_FROM_FAVORITES:
        favorites = favorites.filter(item => item.id !== movie.id);
        return favorites;
      default:
        return favorites;
    }
  }
});

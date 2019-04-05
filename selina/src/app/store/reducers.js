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
  users(users = [], action) {
    switch (action.type) {
      case mutations.SET_STATE:
        return action.state.users || users;
      default:
        return users;
    }
  }
});

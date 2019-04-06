export const REQUEST_AUTHENTICATE_USER = "REQUEST_AUTHENTICATE_USER";
export const PROCESSING_AUTHENTICATE_USER = "PROCESSING_AUTHENTICATE_USER";
export const REQUEST_USER_CREATION = "REQUEST_USER_CREATION";
export const AUTHENTICATING = "AUTHENTICATING";
export const AUTHENTICATED = "AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";
export const SET_STATE = "SET_STATE";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const GET_LATEST_MOVIES = "GET_LATEST_MOVIES";
export const API_KEY = "8ab7e0be43d0d5e7ac1a3e4987488db9";
export const LANGUAGE = "en-US";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const setState = (state = {}) => ({
  type: SET_STATE,
  state
});

export const getLatestMovies = (page = 1) => ({
  type: GET_LATEST_MOVIES,
  page,
  key: API_KEY,
  language: LANGUAGE
});

export const addToFavorites = (userID, movie) => ({
  type: ADD_TO_FAVORITES,
  userID,
  movie
});

export const removeFromFavorites = (userID, movie) => ({
  type: REMOVE_FROM_FAVORITES,
  userID,
  movie
});

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password
});

export const processAuthenticateUser = (
  status = AUTHENTICATING,
  session = null
) => ({
  type: PROCESSING_AUTHENTICATE_USER,
  session,
  authenticated: status
});

export const requestUserCreation = (username, password) => ({
  type: REQUEST_USER_CREATION,
  username,
  password
});

export const REQUEST_AUTHENTICATE_USER = "REQUEST_AUTHENTICATE_USER";
export const PROCESSING_AUTHENTICATE_USER = "PROCESSING_AUTHENTICATE_USER";
export const REQUEST_USER_CREATION = "REQUEST_USER_CREATION";
export const AUTHENTICATING = "AUTHENTICATING";
export const AUTHENTICATED = "AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";
export const SET_STATE = "SET_STATE";

export const setState = (state = {}) => ({
  type: SET_STATE,
  state
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

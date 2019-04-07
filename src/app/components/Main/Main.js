import React from "react";
import { Provider } from "react-redux";
import { Router, Route, BrowserRouter, Redirect } from "react-router-dom";
import { store } from "../../store";
import { history } from "../../store/history";
import { ConnectedMoviesGrid } from "../MoviesGrid/MoviesGrid";
import { ConnectedNavigation } from "../Navigation/Navigation";
import { ConnectedMovieCard } from "../MovieCard/MovieCard";
import { ConnectedLogin } from "../Login/Login";
import { About } from "../About/About";
import { ConnectedSignUp } from "../SignUp/SignUp";
import { ConnectedAdmin } from "../Admin/Admin";
import LoadingBar from "react-redux-loading-bar";
import "./Main.css";

// This PrivateRoute function will render the component only if the user is logged in and
//authenticated, otherwise the function will redirect the user to the login page.
function PrivateRoute({ component: Component, ...rest }) {
  let auth = store.getState().session.authenticated;
  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default class Main extends React.Component {
  //require background image;
  async componentDidMount() {
    await require("../../../assets/subpattern.png");
  }

  // Main component will render the router and the provider of the redux store.
  // Loading bar will show when showLoading action is dispatched
  // all the 'Connected' + component is wrapped by a connect and
  // get mapStateToProps and mapDispatchToProps if declared.
  render() {
    return (
      <Router history={history}>
        <Provider store={store}>
          <LoadingBar />
          <ConnectedNavigation />
          {!store.getState().session.authenticated ? (
            <Redirect from="/" to="/login" />
          ) : null}
          <Route exact path="/login" component={ConnectedLogin} />
          <Route exact path="/signup" component={ConnectedSignUp} />
          <Route exact path="/admin" component={ConnectedAdmin} />
          <PrivateRoute exact path="/movies" component={ConnectedMoviesGrid} />
          <Route exact path="/about" component={About} />
          <PrivateRoute
            exact
            path="/favorites"
            view="favorites"
            component={ConnectedMoviesGrid}
          />
        </Provider>
      </Router>
    );
  }
}

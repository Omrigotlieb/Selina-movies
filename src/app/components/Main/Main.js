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
import Loader from "../Loader/Loader";

import "./Main.css";
import loader from "../../../assets/loader.gif";

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
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    await require("../../../assets/subpattern.png");
    this.setState({ isLoading: false });
  }

  render() {
    let { isLoading } = this.state;
    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <Router history={history}>
          <Provider store={store}>
            <ConnectedNavigation />
            {!store.getState().session.authenticated ? (
              <Redirect from="/" to="/login" />
            ) : null}
            <Route exact path="/login" component={ConnectedLogin} />
            <Route exact path="/signup" component={ConnectedSignUp} />
            <PrivateRoute
              exact
              path="/movies"
              component={ConnectedMoviesGrid}
            />
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
}

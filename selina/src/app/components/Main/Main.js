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
      isLoading: true,
      moviesData: [
        {
          vote_count: 3221,
          id: 299537,
          video: false,
          vote_average: 7.2,
          title: "Captain Marvel",
          popularity: 351.105,
          poster_path: "/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg",
          original_language: "en",
          original_title: "Captain Marvel",
          genre_ids: [28, 12, 878],
          backdrop_path: "/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg",
          adult: false,
          overview:
            "The story follows Carol Danvers as she becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, Captain Marvel is an all-new adventure from a previously unseen period in the history of the Marvel Cinematic Universe.",
          release_date: "2019-03-06"
        },
        {
          vote_count: 585,
          id: 458723,
          video: false,
          vote_average: 7.4,
          title: "Us",
          popularity: 260.31,
          poster_path: "/ux2dU1jQ2ACIMShzB3yP93Udpzc.jpg",
          original_language: "en",
          original_title: "Us",
          genre_ids: [53, 27],
          backdrop_path: "/jNUCddkM1fjYcFIcEwFjc7s2H4V.jpg",
          adult: false,
          overview:
            "Husband and wife Gabe and Adelaide Wilson take their kids to their beach house expecting to unplug and unwind with friends. But as night descends, their serenity turns to tension and chaos when some shocking visitors arrive uninvited.",
          release_date: "2019-03-14"
        },
        {
          vote_count: 321,
          id: 329996,
          video: false,
          vote_average: 6.7,
          title: "Dumbo",
          popularity: 224.505,
          poster_path: "/ttN0czDnCpr64aj3ANGEf3DKE1L.jpg",
          original_language: "en",
          original_title: "Dumbo",
          genre_ids: [12, 10751, 14],
          backdrop_path: "/JeQZJzWPyZFcTBMHIjxIWwPpIB.jpg",
          adult: false,
          overview:
            "A young elephant, whose oversized ears enable him to fly, helps save a struggling circus, but when the circus plans a new venture, Dumbo and his friends discover dark secrets beneath its shiny veneer.",
          release_date: "2019-03-27"
        }
      ]
    };
  }

  async componentDidMount() {
    await require("../../../assets/subpattern.png");
    this.setState({ isLoading: false });
  }

  async componentWillMount() {
    // require('../../../assets/about-bg.jpg');
    // require('../../../assets/bg.jpg');
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
            <PrivateRoute exact path="/about" component={About} />
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

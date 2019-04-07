import React from "react";
import { connect } from "react-redux";
import { store } from "../../store";
import "./MoviesGrid.css";
import { results } from "../../../data/movies";
import { ConnectedMovieCard } from "../MovieCard/MovieCard";
import notfound from "../../../assets/notfound.png";
import * as actions from "../../store/actions";
import { resetLoading } from "react-redux-loading-bar";

class MoviesGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  // Fetch latest movie list if not in favorites mode
  // the api call needs to be from the client side therefore in componentDidmount.
  // After fetch reset Loading Bar
  componentDidMount() {
    if (this.props.match.path !== "/favorites") {
      this.props.fetchLatestMovies(this.props, this.state.page);
      this.props.resetLoadingBar();
    }
  }

  // On right arrow click fetchLatestMovies will dispatch and will fetch the next page;
  nextPage() {
    this.props.fetchLatestMovies(this.props, this.state.page + 1);
    this.setState({
      page: this.state.page + 1
    });
    this.props.resetLoadingBar();
  }

  // On left arrow click fetchLatestMovies will dispatch and will fetch the previous page;
  previousPage() {
    this.props.fetchLatestMovies(this.props, this.state.page - 1);
    this.setState({
      page: this.state.page - 1
    });
  }

  // MoviesGrid will render the a grid of all the movie cards or favorites.
  // The map function would iterate over the moviesData array and will create ConnectedMovieCard.
  // The moviesData is sliced to 12 for better UX and UI.
  // If the favorite movies still does not exist it will render a div with a message.
  render() {
    let { match, results, movies, session } = this.props;
    const fetchNextPage = this.props.fetchLatestMovies;
    let favoritesMovies = this.props.favorites || [];
    //Check if in favorites mode.
    let favoriteMode = match && match.path === "/favorites";
    let moviesData = favoriteMode && favoritesMovies ? favoritesMovies : movies;
    return (
      <div className="container-grid">
        {favoriteMode && !favoritesMovies.length ? (
          <div className="not-found">
            <img src={notfound} />
            <span>
              <br />
              You don't have any favorite movies?
            </span>
          </div>
        ) : (
          moviesData &&
          moviesData
            .slice(0, 12)
            .map((movie, i) => <ConnectedMovieCard movie={movie} key={i} />)
        )}
        <div className="empty" />
        <div className="left-arrow-container">
          {this.state.page != 1 && !favoriteMode ? (
            <button onClick={this.previousPage} className="arrows">
              <i className="fa fa-arrow-circle-left fa-3x" aria-hidden="true" />
            </button>
          ) : null}
        </div>
        <div className="right-arrow-container">
          {moviesData.length && !favoriteMode ? (
            <button onClick={this.nextPage} className="arrows">
              <i
                className="fa fa-arrow-circle-right fa-3x"
                aria-hidden="true"
              />
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ movies, favorites, location, session }) => ({
  session,
  movies,
  favorites,
  location
});

// Fetch latest movies would dispatch an action and getLatestMoviesSaga
// in Sagas.js will fetch all the new movies, by page, and will set state for
// the recived movies.
const mapDispatchToProps = dispatch => {
  return {
    resetLoadingBar() {
      dispatch(resetLoading());
    },
    fetchLatestMovies(state, page) {
      dispatch(actions.getLatestMovies(state, page));
    }
  };
};

export const ConnectedMoviesGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesGrid);

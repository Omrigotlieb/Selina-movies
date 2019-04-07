import React from "react";
import { connect } from "react-redux";
import { store } from "../../store";
import "./MoviesGrid.css";
import { results } from "../../../data/movies";
import { ConnectedMovieCard } from "../MovieCard/MovieCard";
import notfound from "../../../assets/notfound.png";
import * as actions from "../../store/actions";
class MoviesGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  // fetch latest movie list
  componentDidMount() {
    this.props.fetchLatestMovies(this.props, this.state.page);
  }

  nextPage() {
    this.props.fetchLatestMovies(this.props, this.state.page + 1);
    this.setState({
      page: this.state.page + 1
    });
  }

  previousPage() {
    this.props.fetchLatestMovies(this.props, this.state.page - 1);
    this.setState({
      page: this.state.page - 1
    });
  }

  render() {
    let { match, results, movies, session } = this.props;
    const fetchNextPage = this.props.fetchLatestMovies;
    let favoritesMovies = this.props.favorites || [];
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

const mapDispatchToProps = dispatch => {
  return {
    fetchLatestMovies(state, page) {
      dispatch(actions.getLatestMovies(state, page));
    }
  };
};

export const ConnectedMoviesGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesGrid);

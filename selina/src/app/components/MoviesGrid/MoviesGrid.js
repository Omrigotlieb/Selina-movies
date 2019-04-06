import React from "react";
import { connect } from "react-redux";
import { store } from "../../store";
import "./MoviesGrid.css";
import { results } from "../../../data/movies";
import { ConnectedMovieCard } from "../MovieCard/MovieCard";
import notfound from "../../../assets/notfound.png";
class MoviesGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.result = results();
  }

  render() {
    let { match } = this.props;
    let favoritesMovies = this.props.favorites || [];
    let favoriteMode = match && match.path === "/favorites";
    let moviesData =
      favoriteMode && favoritesMovies ? favoritesMovies : this.result;
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
      </div>
    );
  }
}

const mapStateToProps = ({ favorites, location }) => ({
  favorites,
  location
});

const mapDispatchToProps = dispatch => ({});

export const ConnectedMoviesGrid = connect(mapStateToProps)(MoviesGrid);

import React from "react";
import { connect } from "react-redux";
import { store } from "../../store";
import * as actions from "../../store/actions";
import "./MovieCard.css";

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      movie,
      key,
      like,
      unlike,
      favorites,
      match,
      userID,
      otherUsers,
      state
    } = this.props;
    let isFavorite = favorites.filter(item => item.id === movie.id).length;
    let url = "https://image.tmdb.org/t/p/w500/";
    let imgSrc = `${url}${movie["poster_path"]}`;
    let overview = movie.overview;
    let shortOverview = overview ? overview.slice(0, 207) + "..." : "";
    let title = movie.title;
    let vote_average = movie["vote_average"];
    let release_date = movie["release_date"];

    return (
      <div className="container" key={key}>
        <div className="card">
          <div className="rating">
            <i className="fa fa-star" aria-hidden="true" />
            <span>{vote_average}</span>
          </div>

          <div className="poster">
            <img src={imgSrc} />
          </div>
          <div className="heart">
            {isFavorite ? (
              <div
                className="like"
                onClick={() => unlike(state, userID, movie)}
              >
                <i className="fa fa-heart" aria-hidden="true" />
              </div>
            ) : (
              <div className="like" onClick={() => like(state, userID, movie)}>
                <i className="fa fa-heart-o" aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="details">
            <h2>{title}</h2>
            <span> Directed by Omri Gotlieb </span>

            <div className="tags">
              <div className="fantasy">Fantasy</div>
              <div className="romance">Romance</div>
              <div className="comedy">Comedy</div>
            </div>
            <div className="info">
              <p>{shortOverview}</p>
            </div>
            <div className="date">
              <h4>{release_date}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ state, otherUsers, favorites, session, match }) => ({
  state,
  otherUsers,
  favorites,
  match,
  userID: session.id
});

const mapDispatchToProps = dispatch => {
  return {
    like(state, userID, movie) {
      dispatch(actions.addToFavorites(state, userID, movie));
    },
    unlike(state, userID, movie) {
      dispatch(actions.removeFromFavorites(state, userID, movie));
    }
  };
};
export const ConnectedMovieCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieCard);

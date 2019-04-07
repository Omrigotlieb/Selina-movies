import React from "react";
import { connect } from "react-redux";
import { store } from "../../store";
import * as actions from "../../store/actions";
import "./MovieCard.css";
import { Modal } from "../CardModal/CardModal";

// Toggle CardModal on click using react hooks;
const ToggleContent = ({ toggle, content }) => {
  const [isShown, setIsShown] = React.useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <React.Fragment>
      {toggle(show)}
      {isShown && content(hide)}
    </React.Fragment>
  );
};

// Render a single movie card with the given data.
// The render has ToggleContent for the modal.
class MovieCard extends React.Component {
  render() {
    let {
      movie,
      key,
      like,
      unlike,
      favorites,
      match,
      userID,
      state
    } = this.props;
    const isFavorite = favorites.filter(item => item.id === movie.id).length;
    const url = "https://image.tmdb.org/t/p/w500/";
    const imgSrc = `${url}${movie["poster_path"]}`;

    // if overview is long slice it for the card grid.
    const overview = movie.overview;
    let shortOverview = overview ? overview.slice(0, 207) + "..." : "";

    let title = movie.title;
    let vote_average = movie["vote_average"];
    let release_date = movie["release_date"];

    return (
      <ToggleContent
        toggle={show => (
          <div className="container" key={key}>
            <div className="heart">
              {isFavorite ? (
                <div
                  className="like"
                  onClick={e => unlike(e, state, userID, movie)}
                >
                  <i className="fa fa-heart" aria-hidden="true" />
                </div>
              ) : (
                <div
                  className="like"
                  onClick={e => like(e, state, userID, movie)}
                >
                  <i className="fa fa-heart-o" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="card" onClick={show}>
              <div className="rating">
                <i className="fa fa-star" aria-hidden="true" />
                <span>{vote_average}</span>
              </div>

              <div className="poster">
                <img src={imgSrc} />
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
        )}
        content={hide => <Modal movie={movie} hide={hide} />}
      />
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

// Like and unlike will add the movie to favorites by dispacthing an action.
const mapDispatchToProps = dispatch => {
  return {
    like(e, state, userID, movie) {
      e.preventDefault();
      dispatch(actions.addToFavorites(state, userID, movie));
    },
    unlike(e, state, userID, movie) {
      dispatch(actions.removeFromFavorites(state, userID, movie));
    }
  };
};

export const ConnectedMovieCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieCard);

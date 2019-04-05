import React from "react";
import { connect } from "react-redux";
import { store } from "../../store";
import "./MovieCard.css";

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { item, key } = this.props;
    let url = "https://image.tmdb.org/t/p/w500/";
    let imgSrc = `${url}${item["poster_path"]}`;
    let state = store.getState();
    let overview = item.overview;
    let shortOverview = overview ? overview.slice(0, 207) + "..." : "";
    let title = item.title;
    let vote_average = item["vote_average"];
    let release_date = item["release_date"];

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

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({});

export const ConnectedMovieCard = connect(state => state)(MovieCard);

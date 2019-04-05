import React from "react";
import { connect } from "react-redux";
import { store } from "../../store";
import "./MoviesGrid.css";
import { results } from "../../../data/movies";
import { ConnectedMovieCard } from "../MovieCard/MovieCard";
class MoviesGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let moviesData = results();
    return (
      <div className="container-grid">
        {moviesData &&
          moviesData
            .slice(0, 12)
            .map((item, i) => <ConnectedMovieCard item={item} key={i} />)}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({});

export const ConnectedMoviesGrid = connect(state => state)(MoviesGrid);

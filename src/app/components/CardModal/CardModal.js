import React from "react";
import ReactDOM from "react-dom";
import "./CardModal.css";

export const Modal = ({ movie, children, hide }) => {
  let url = "https://image.tmdb.org/t/p/w500";
  let imgSrc = `${url}${movie["poster_path"]}`;
  let backdropUrl = "https://image.tmdb.org/t/p/w1280";
  let backdropImgSrc = `${backdropUrl}${movie["backdrop_path"]}`;

  var modalStyle = {
    background: `url(${backdropImgSrc}) no-repeat center center`,
    backgroundSize: "cover"
  };

  return ReactDOM.createPortal(
    <div className="modal" style={modalStyle}>
      <i className="fa fa-times-circle-o fa-2x modal-x" onClick={hide} />
      <div className="modal-title">{movie.title}</div>
      <div className="modal-overview">{movie.overview}</div>
      <div className="modal-rating">
        <i className="fa fa-star fa-3x" aria-hidden="true" />
        <span>{movie["vote_average"]}</span>
      </div>
      {children}
    </div>,
    document.getElementById("modal")
  );
};

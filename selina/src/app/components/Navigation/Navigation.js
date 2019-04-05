import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import logo from "../../../assets/logo_purple.png";
import "./Navigation.css";

const Navigation = () => (
  <div className="navigation-container">
    <Link to="/">
      <img className="logo" src={logo} />
    </Link>
    <div className="nav">
      <Link to="/movies">
        <span className="nav-item">
          <i className="fa fa-film" aria-hidden="true" />
        </span>
      </Link>
      <Link to="/favorites">
        <span className="nav-item">
          <i className="fa fa-heart" aria-hidden="true" />
        </span>
      </Link>
      <Link className="about" to="/about">
        <span className="nav-item info-circle">
          <i className="fa fa-info-circle fa-beat fa-fw" aria-hidden="true" />
        </span>
      </Link>
    </div>
  </div>
);

export const ConnectedNavigation = connect(state => state)(Navigation);

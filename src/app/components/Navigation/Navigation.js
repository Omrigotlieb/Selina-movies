import React from "react";
import { store } from "../../store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Navigation.css";
import * as actions from "../../store/actions";

class Navigation extends React.Component {
  render() {
    let { admin, authenticated } = this.props;
    const auth = authenticated === actions.AUTHENTICATED;
    return (
      <div className="navigation-container">
        <Link to="/login">
          <img className="logo" src={logo} />
        </Link>
        {auth ? (
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
            {admin ? (
              <Link to="/admin">
                <span className="nav-item">
                  <i className="fa fa-user" aria-hidden="true" />
                </span>
              </Link>
            ) : null}
            <Link className="about" to="/about">
              <span className="nav-item info-circle">
                <i
                  className="fa fa-info-circle fa-beat fa-fw"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.session.admin,
  authenticated: state.session.authenticated
});

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);

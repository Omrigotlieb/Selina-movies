import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Input } from "../Input/Input";
import * as actions from "../../store/actions";
import "./Login.css";

class Login extends React.Component {
  render() {
    let { authenticated, authentication, location } = this.props;
    if (authenticated === actions.AUTHENTICATED) {
      return <Redirect from="/login" to="/movies" />;
    } else {
      return (
        <div data-hook="login-container" className="login-container">
          <div data-hook="login-form" className="login-form">
            <div className="login-titles">
              <div className="login-title">
                <span>Selina Movies</span>
              </div>
              <div className="login-secondary-title">
                <span>It's a Selina's friends only secret place</span>
              </div>
            </div>
            <form onSubmit={authentication}>
              <div className="username">
                <span className="username-title">Email</span>
                <Input
                  className="username"
                  name="username"
                  defaultValue="Dev"
                  placeholder="Enter your username"
                />
              </div>
              <div className="password">
                <span className="password-title">Password</span>
                <Input
                  className="password"
                  type="password"
                  name="password"
                  defaultValue="Dev"
                  placeholder="Enter your password"
                />
              </div>
              <div className="remember-area">
                <Input
                  className="remember-checkbox"
                  type="checkbox"
                  checked={true}
                />
                <div className="remember">
                  <span className="remember-title">Remember me</span>
                </div>
              </div>
              <div className="failed">
                {authenticated === actions.NOT_AUTHENTICATED ? (
                  <span className="failed-title">
                    Check your details once again!
                  </span>
                ) : null}
              </div>
              <div className="sign">
                <div className="sign-up">
                  <Link to="/signup">
                    <span>Sign Up</span>
                  </Link>
                </div>
                <div className="sign-in">
                  <button
                    className="login-button"
                    type="submit"
                    disabled={false}
                  >
                    <span className="login-button-title">Login</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated
});

const mapDispatchToProps = dispatch => {
  return {
    authentication(e) {
      e.preventDefault();
      let username = e.target["username"].value;
      let password = e.target["password"].value;
      dispatch(actions.requestAuthenticateUser(username, password));
    }
  };
};

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

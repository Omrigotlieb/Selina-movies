import React from "react";
import { connect } from "react-redux";
import "./SignUp.css";
import { Input } from "../Input/Input";
import * as actions from "../../store/actions";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { signup } = this.props;
    return (
      <div data-hook="login-container" className="login-container">
        <div data-hook="login-form" className="login-form">
          <div className="login-titles">
            <div className="login-title">
              <span>Sign up</span>
            </div>
            <div className="login-secondary-title">
              <span>Please enter username and password:</span>
            </div>
          </div>
          <form onSubmit={signup}>
            <div className="username">
              <span className="username-title">Email</span>
              <Input
                className="username"
                name="username"
                placeholder="Enter your username"
              />
            </div>
            <div className="password">
              <span className="password-title">Password</span>
              <Input
                className="password"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="failed" />
            <div className="sign">
              <div className="sign-in">
                <button
                  className="sign-up-button"
                  type="submit"
                  disabled={false}
                >
                  <span className="login-button-title">Sign Up</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup(e) {
      e.preventDefault();
      let username = e.target["username"].value;
      let password = e.target["password"].value;
      dispatch(actions.requestUserCreation(username, password));
    }
  };
};

export const ConnectedSignUp = connect(
  null,
  mapDispatchToProps
)(SignUp);

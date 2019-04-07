import React from "react";
import { connect } from "react-redux";
import "./Input.css";

// Will handle input validations - if email use regex.
// Todo validate email.

export class Input extends React.Component {
  //const isEmail = new RegExp(/(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])")@(?:(?:a-z0-9?.)+a-z0-9?|[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/);

  render() {
    let { type, className, placeholder, name, defaultValue } = this.props;
    return (
      <div className="input-container">
        <input
          type={type}
          className={className}
          placeholder={placeholder}
          name={name}
          defaultValue={defaultValue}
        />
      </div>
    );
  }
}

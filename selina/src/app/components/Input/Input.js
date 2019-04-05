import React from "react";
import { connect } from "react-redux";
import "./Input.css";

export class Input extends React.Component {
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

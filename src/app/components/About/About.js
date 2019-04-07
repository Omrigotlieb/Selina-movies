import React from "react";
import { connect } from "react-redux";
import omri from "../../../assets/omri.png";
import "./About.css";

export const About = () => (
  <div>
    <div className="about-bg-img" />
    <div className="about-container">
      <img src={omri} className="omri-pic" />
      <div className="text-container">
        <h1>Omri Gotlieb</h1>
        <div className="about-text">
          <p>
            Hey, :) <br /> I'm a Frontend developer from Tel Aviv. <br />
            You can find out more about me here:
          </p>
        </div>
      </div>
      <div className="social-container">
        <div className="github icon">
          <a
            className="social-link"
            title="Github"
            href="https://github.com/Omrigotlieb"
          >
            <i className="fa fa-github social" aria-hidden="true" />
          </a>
        </div>
        <div className="linkedin icon">
          <a
            className="social-link"
            title="Linkedin"
            href="https://www.linkedin.com/in/omrigotlieb/"
          >
            <i className="fa fa-linkedin social" aria-hidden="true" />
          </a>
        </div>
        <div className="facebook icon">
          <a
            className="social-link"
            title="Facebook"
            href="https://www.facebook.com/omri.gotlieb"
          >
            <i className="fa fa-facebook social" aria-hidden="true" />
          </a>
        </div>
        <div className="email icon">
          <a
            className="social-link"
            title="Email"
            href="mailto:omrigotlieb@gmail.com"
          >
            <i className="fa fa-envelope-o social" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

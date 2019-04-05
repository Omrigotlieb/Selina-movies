import React from "react";
import "./Loader.css";

export default function Lodaer() {
  return (
    <div className="lds-css ng-scope">
      <div className="lds-cube">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

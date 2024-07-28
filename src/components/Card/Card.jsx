import React from "react";
import "./Card.css";

export const Card = ({title="", id="", description=""}) => {
  return (
    <div className="container card">
      <p>{id}</p>
      <h1>{title}</h1>
      <h3>{description}</h3>
    </div>
  );
};

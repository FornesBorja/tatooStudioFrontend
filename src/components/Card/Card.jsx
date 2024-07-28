import React from "react";
import "./Card.css";

export const Card = ({title="", id="", description="", imageUrl }) => {
  return (
    <div className="container card-container">
      {imageUrl?(<img src={imageUrl} alt={title} />):null}
      <div className="card-text">
        <p>{id}</p>
        <h1>{title}</h1>
        <h3>{description}</h3>
      </div>
    </div>
  );
};

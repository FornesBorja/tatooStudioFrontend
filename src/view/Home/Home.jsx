import React from "react";
import "./Home.css";
import { Card } from "../../components/Card/Card";

export const Home = () => {
  return (
    <>
      <div className="container row card-container">
        <Card
          imageUrl ="https://st2.depositphotos.com/1001951/11029/i/950/depositphotos_110294652-stock-photo-professional-tattoo-artist-makes-a.jpg"
          title="Welcome to tattoo studio"
          description="Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu ligula erat. Ut in ligula hendrerit."
        />
      </div>
    </>
  );
};

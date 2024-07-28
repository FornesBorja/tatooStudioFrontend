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
          description="Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu ligula erat. Ut in ligula hendrerit, suscipit est vitae, facilisis orci. Aenean pharetra ullamcorper faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus interdum nec lorem non egestas. Nam fringilla ac magna nec sagittis. Cras at justo rhoncus, viverra nisl ut, consectetur eros. In eu feugiat erat, ultricies venenatis augue. Vivamus condimentum ante ut lorem euismod, vel semper dolor pharetra. Donec sed tempus odio, eget imperdiet libero. Vivamus in magna leo. Curabitur et urna sed diam mollis cursus non eu nulla."
        />
      </div>
    </>
  );
};

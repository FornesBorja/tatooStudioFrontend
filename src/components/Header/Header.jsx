import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Surfer } from '../Surfer/Surfer';
import "./Header.css"

export const Header = () => {
  const navigate = useNavigate();

  const passport = JSON.parse(localStorage.getItem("passport"));
  let token;
  if (passport) {
    token = passport.token;
  }

  return (
    <>
      <div id="navbar" className='miltonian-tattoo-regular'>
        <Surfer path="/" content="Home" />
        <Surfer path="/services" content="Services" />
        {token ? (
          <>
            <div className="log-button" onClick={() => localStorage.removeItem("passport")}> LOGOUT </div>
            <Surfer path="/profile" content="Profile" />
          </>
        ) : (
          <>
            <Surfer classAdd="log-button" path="/register" content="Register" />
            <div className="log-button" onClick={() => navigate("/login")}> Login </div>
          </>
        )}
      </div>
    </>
  );
}

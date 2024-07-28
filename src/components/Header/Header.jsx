import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Surfer } from '../Surfer/Surfer';
import "./Header.css"
import '@fontsource/jacquard-24'

export const Header = () => {
  const navigate = useNavigate();

  const passport = JSON.parse(localStorage.getItem("passport"));
  let token, role;
  if (passport) {
    token = passport.token;
    role = passport.tokenData.roleId;
  }

  return (
    <>
      <div id="navbar" className='germania-one'>
        <Surfer path="/" classAdd="jacquard-24" content="Tattoo Studio"/>
        <div className="right-section">
        <Surfer path="/services" content="Services" />
        {role===1?(<Surfer path="/admin" content="Admin"/>):null}
        {token ? (
          <>
            <Surfer path="/profile" content="Profile" />
            <Surfer path="/appointments" content="Appointments" />
            <div className="log-button" onClick={() => {(localStorage.removeItem("passport")); navigate("/login")}}> LOGOUT </div>
          </>
        ) : (
          <>
            <Surfer classAdd="log-button" path="/register" content="Register" />
            <div className="log-button" onClick={() => navigate("/login")}> Login </div>
          </>
        )}        
        </div>
      </div>
    </>
  );
}

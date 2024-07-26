import { Routes, Route } from "react-router-dom";
import React from 'react'
import { NotFound } from '../../view/NotFound/NotFound';
import { Home } from "../../view/Home/Home";
import { Register } from "../../view/Register/Register";

export const Body = () => {
  const passport = JSON.parse(localStorage.getItem("passport"));
  let role = null
  if (passport) {
    role = passport.tokenData.role;
  }
  return (
    <>
    <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </>
  )
}

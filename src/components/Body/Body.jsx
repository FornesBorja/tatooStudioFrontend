import { Routes, Route } from "react-router-dom";
import React from 'react'
import { NotFound } from '../../view/NotFound/NotFound';
import { Home } from "../../view/Home/Home";
import { Register } from "../../view/Register/Register";
import { Login } from "../../view/Login/Login";
import { Profile } from "../../view/Profile/Profile";
import { Services } from "../../view/Services/Services";
import { Admin } from "../../view/Admin/Admin";

export const Body = () => {
  const passport = JSON.parse(localStorage.getItem("passport"));
  let role = null
  if (passport) {
    role = passport.tokenData.roleId;
  }
  return (
    <>
    <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/appointments" element={<Services/>}/>
        {role === 1 && <Route path="/admin" element={<Admin/>} />}
      </Routes>
    </>
  )
}

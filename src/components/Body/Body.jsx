import { Routes, Route } from "react-router-dom";
import React from 'react'
import { NotFound } from '../../view/NotFound/NotFound';
import { Home } from "../../view/Home/Home";

export const Body = () => {
  return (
    <>
    <Routes>
        <Route path="*" element={<NotFound />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </>
  )
}

import React, { createContext, useState } from 'react'

export const AttempsContext = createContext()

export const AttempsProvider = ({children}) => {
    const [number, setNumber]=useState(0);
  return (
    <AttempsContext.Provider value={{number, setNumber}}>
        {children}
    </AttempsContext.Provider>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Surfer = ({ classAdd ,content, path}) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={classAdd} onClick={() => navigate(path)}> {content} </div>
        </>
    )
}

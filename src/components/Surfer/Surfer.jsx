import React from 'react'

export const Surfer = () => {
    const navigate = useNavigate();
    return (
        <>
            <div onClick={() => navigate(path)}> {content} </div>
        </>
    )
}

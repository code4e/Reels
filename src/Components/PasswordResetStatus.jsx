import React from 'react'
import { useLocation } from "react-router-dom";

const PasswordResetStatus = () => {
    const location = useLocation();
    return (
        <>
            { location.state === null ? <div>Oops! Something went wrong</div> : <div>{location.state.passwordResetState}</div>}
        </>

    )
}

export default PasswordResetStatus
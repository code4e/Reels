import React, {useContext} from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';

function Feed() {
    const location = useLocation();
    const {Logout} = useContext(AuthContext);
  return (
    <div>
        <h1>{`Welcome to feed`}</h1>
        <button onClick={Logout}>Logout</button>
    </div>
  )
}

export default Feed
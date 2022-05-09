import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import UploadFile from './UploadFile';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, storage } from '../Firebase';
import Posts from './Posts';

function Feed() {
  const { user, Logout } = useContext(AuthContext);
  const [userData, setUserData] = useState('');
  const location = useLocation();
  useEffect(() => {
    const docRef = doc(db, "users", user.uid);
    // console.log(docRef.id);
    const unsub = onSnapshot(docRef, (doc) => {
      // console.log(doc.data());
      setUserData(doc.data());
    });

    //clean
    return () => {
      unsub();
    }

  }, [user]);

 

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
      <div className='comp' style={{ width: '50%' }}>
        <h1>{`Welcome to feed`}</h1>
        <button onClick={Logout}>Logout</button>

      </div>
      <UploadFile user={userData} />

      <Posts user={userData}  /> 

    </div>
  )
}

export default Feed
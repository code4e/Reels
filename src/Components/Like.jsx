import React, { useState, useEffect } from 'react';
import { Favorite } from '@material-ui/icons';
import { updateDoc, doc, connectFirestoreEmulator } from "firebase/firestore";
import { db } from '../Firebase';

const Like = ({ userData, postData }) => {
    // console.log(userData);
    // console.log(postData);
    const [like, setlike] = useState(null);
    useEffect(() => {
        let check = postData.likes.includes(userData.userId);
        setlike(check);
        //   console.log(postData.postId);
    }, [postData])

    const handleLikeUnlike = async () => {


        const postDocRef = await doc(db, "posts", postData.postId);
        let parr = like === true ? postData.likes.filter(userId => userId !== userData.userId) : [...postData.likes, userData.userId];
        try {
            await updateDoc(postDocRef, {
                likes: parr
            });

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            {
                like != null ?
                    like === true ? <Favorite className='icon-styling liked' onClick={handleLikeUnlike} /> : <Favorite className='licon-styling unliked' onClick={handleLikeUnlike} />
                    : <></>
            }

        </div>
    )
}

export default Like
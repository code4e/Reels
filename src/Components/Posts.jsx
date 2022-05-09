import React, { useState, useEffect } from 'react'
import { query, orderBy, doc, onSnapshot, collection } from "firebase/firestore";
import { db, storage } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Video from '../Components/Video';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Like from './Like';
import './Post.css';
const Posts = (props) => {
    const [posts, setPosts] = useState(null);
    // console.log(props.user.fullname);
    useEffect(() => {
        let parr = [];
        const posts = collection(db, "posts");
        // console.log(posts);
        const q = query(posts, orderBy("createdAt", "desc"));

        // console.log(q);
        //fetch posts collection based on the query and set them in the set posts state to render them on the page
        const unsub = onSnapshot(q, (querySnapshot) => {
            parr = []
            querySnapshot.forEach(doc => {
                let data = { ...doc.data(), postId: doc.id };
                // console.log(data);
                parr.push(data);
            });

            setPosts(parr);

        }, []);
        //clean event listener
        return () => {
            unsub();
        }


    }, [])


    return (
        <div style={{ marginTop: "1%" }}>
            {
                // check if there is no post or userdata is null meaning user data is still loading
                (posts == null || props == null) ? <CircularProgress color="secondary" /> : <div className='video-container'>
                    {
                        posts.length === 0 ? <Alert severity="info">Please upload something</Alert> :
                            posts.map((post, idx) => (

                                <React.Fragment key={idx}>
                                    <div className='videos'>
                                        <Video url={post.pURL} />
                                        <div className='fa'>
                                            <Avatar src={props.user.profileURL} />
                                            <h1>{props.user.fullname}</h1>
                                        </div>
                                        <div className='like-cont'>
                                            <Like userData={props.user} postData={post} />
                                        </div>

                                    </div>

                                </React.Fragment>

                            ))
                    }
                </div>
            }
        </div>
    )
}

export default Posts
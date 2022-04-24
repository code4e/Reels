import React, { useState, useEffect, useContext } from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { Movie } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../Context/AuthContext';
import { collection, addDoc, updateDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { db, storage, usersDocData } from '../Firebase';
import firebase from 'firebase/compat/app';
import { serverTimestamp } from "firebase/database";

const UploadFile = (props) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    // console.log(setUser);

    const handleFileUpload = async (file) => {
        // console.log(file);
        if (file == null) {
            setError('Please upload a file');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        if (file.size / (1024 * 1024) > 100) {
            setError('Please upload a file under 100MB');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        let uid = uuidv4();
        setLoading(true);
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on('state_changed', fn1, fn2, fn3);
        function fn1(snapshot) {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% completed`);
            setLoading(true);

        }
        function fn2(err) {
            setError(err)
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
            return;
        }
        function fn3() {

            uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {

                let postDocData = {
                    likes: [],
                    comments: [],
                    pId: uid,
                    pURL: url,
                    uName: props.user.fullname,
                    uProfile: props.user.profileURL,
                    userId: props.user.userId,
                    createdAt: serverTimestamp()

                }

                const postRef = await addDoc(collection(db, "posts"), postDocData);
                console.log("Document written with ID: ", postRef.id);

                const userDocRef = await doc(db, "users", props.user.userId);

                try {
                    await updateDoc(userDocRef, {
                        postsIds: props.user.postsIds != null ? [...props.user.postsIds, postRef.id] : [postRef.id]
                    });

                    // console.log(userDocRef.id);
                    setLoading(false);
                } catch (err) {
                    setError(err)
                    setTimeout(() => {
                        setError('');
                    }, 2000);
                    setLoading(false);
                }

            });

            setLoading(false);
            // navigate("/feed");


        }

    }
    return (
        <div>
            {
                error !== '' ? <Alert severity="error">{error}</Alert> :
                    <div>
                        <input type="file" accept='video'
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                            id="upload-input" style={{ display: 'none' }} />
                        <label htmlFor="upload-input">

                            <Button variant="outlined"
                                component="span"
                                color='secondary'
                                disabled={loading}>
                                <Movie fontSize="small" />&nbsp;Upload Video</Button>
                        </label>
                        {loading && <LinearProgress color="secondary" style={{ marginTop: '3%' }} />}

                    </div>
            }
        </div>
    )
}

export default UploadFile
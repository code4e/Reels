import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton';
import Alert from '@mui/material/Alert';
import TextField from '@material-ui/core/TextField';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import logo from '../assets/insta_logo.jpeg';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from '../Firebase';
import { usersDocData } from '../Firebase';
import firebase from 'firebase/compat/app';
import {  serverTimestamp } from "firebase/database";



export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); //to prevent user from making infinite requests
    const navigate = useNavigate();
    const store = useContext(AuthContext);
    const signup = store.SignUp;


    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
            text1: {
                color: 'gray',
                textAlign: 'center',
                fontSize: 'small'
            },
        },
    }));
    const classes = useStyles();

    const handleSignUpClick = async () => {
        if (!email) {
            setError("Please enter an email.")
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        if (!name) {
            setError("Please enter a username.")
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        if (!password) {
            setError("Please enter a password.")
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        if (!file) {
            setError("Please upload a profile photo first.")
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        try {
            setError('');
            setLoading(true);
            let userObj = await signup(email, password);
            let uid = userObj.user.uid;
            // console.log(uid);

            const uploadTask = storage.ref(`/users/${uid}/profileImage`).put(file);
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

                uploadTask.snapshot.ref.getDownloadURL().then(url => {

                    let usersDocData = {
                        userId: uid,
                        email: email,
                        password: password,
                        profileURL: url,
                        createdAt: serverTimestamp()
                    }
                    const newUsersRef = doc(collection(db, "users"));
                    const resPromise = setDoc(doc(db, "users", uid), usersDocData);
                    
                });

                setLoading(false);
                navigate("/feed");
                
                
            }

        } catch (err) {
            setError(err)
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
        }
    }

    return (

        <div className="signup-wrapper">
            <div className="signup-card">
                <Card variant='outlined'>
                    <CardActionArea>
                        <div className="reels-logo">
                            <img src={logo} alt="" />
                        </div>
                        {/* <div className="alert-container">
                            
                        </div> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" className={classes.text1} component="h2">
                                Sign Up to see photos and videos from your friends
                            </Typography>
                            {error != '' && <Alert severity="error">{error}</Alert>}

                            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} />

                            <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size='small' value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                fullWidth={true}
                                margin="dense"
                                size='small'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />



                            <Button variant="outlined" color="secondary" fullWidth={true} margin="dense" component="label" startIcon={<CloudUploadOutlinedIcon />}>
                                Upload Profile Image
                                <input type="file" accept='image/' hidden className="file"
                                    // value={file}
                                    onChange={(e) => setFile(e.target.files[0])} />
                            </Button>



                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" fullWidth="true" variant='contained' disabled={loading} onClick={handleSignUpClick}>
                            Sign Up
                        </Button>
                    </CardActions>

                    <div className="policy-cont">
                        <Typography variant="body2" className={classes.text1} color="textSecondary" >
                            By signing up you agree to our policies, terms and conditions.
                        </Typography>
                    </div>
                </Card>

                <Card variant='outlined'>
                    <CardActions className='login-cont'>
                        <span className={classes.text1}>Already Have an Account?</span>
                        <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                    </CardActions>
                </Card>
            </div>
        </div>


    );
}

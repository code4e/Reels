import React, { useState,useContext } from 'react';
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
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './Login.css';
import bg from '../assets/insta.png'
import logo from '../assets/insta_logo.jpeg';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import { async } from '@firebase/util';



export default function Login() {

    // const store = useContext(AuthContext);
    // console.log(store);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); //to prevent user from making infinite requests
    const navigate = useNavigate();
    const store = useContext(AuthContext);
    const login = store.Login;

    // console.log(login);

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

    const handleLoginClick = async () => {
        if(!email){
            setError('Please enter an email');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }if(!password){
            setError('Please enter a password');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }
        try{
            setError('');
            setLoading(true);
            let res = await login(email, password);
            setLoading(false);
            navigate("/feed");
            
        }catch(err){
            setError(err);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
            navigate("/login");
            // return;
        }
    }

    return (

        <div className="login-wrapper">


            <div className="imgcar" style={{ backgroundImage: 'url(' + bg + ')', backgroundSize: 'cover' }}>
                <div className="car">
                    <CarouselProvider
                        visibleSlides={1}
                        totalSlides={5}
                        // step={3}
                        naturalSlideWidth={238}
                        naturalSlideHeight={423}
                        hasMasterSpinner
                        isPlaying={true}
                        infinite={true}
                        dragEnabled={false}
                        touchEnabled={false}
                    >
                        <Slider>
                            <Slide index={0}><Image src={img1} /></Slide>
                            <Slide index={1}><Image src={img2} /></Slide>
                            <Slide index={2}><Image src={img3} /></Slide>
                            <Slide index={3}><Image src={img4} /></Slide>
                            <Slide index={4}><Image src={img5} /></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>


            <div className="login-card">
                <Card variant='outlined'>
                    <CardActionArea>
                        <div className="reels-logo">
                            <img src={logo} alt="" />
                        </div>
                        {/* <div className="alert-container">
                            
                        </div> */}
                        <CardContent>

                            {error !== '' && <Alert severity="error">{error}</Alert>}

                            <TextField id="outlined-basic" type="email" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' value={email} 
                            onChange={(e) => setEmail(e.target.value)}/>
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

                            <div className="forgot-pass-cont">
                                <Link className='forgot-pass-link' to="/forgotpassword" style={{ textDecoration: 'none' }}>Forgot Password ? </Link>
                            </div>


                        </CardContent>
                    </CardActionArea>
                    <CardActions>

                        <Button size="small" color="primary" fullWidth="true" variant='contained' disabled={loading} onClick={handleLoginClick}>
                            Login
                        </Button>
                    </CardActions>

                </Card>

                <Card variant='outlined'>
                    <CardActions className='login-cont'>
                        <span className={classes.text1}>Don't have an account already?</span>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>Sign Up</Link>
                    </CardActions>
                </Card>
            </div>
        </div>






    );
}

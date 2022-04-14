import React from 'react';
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
import { Link } from 'react-router-dom';
import './SignUp.css';
import logo from '../assets/insta_logo.jpeg';



export default function ImgMediaCard() {

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
                            {true && <Alert severity="error">This is an error alert — check it out!</Alert>}

                            <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth={true} margin="dense" size='small' />
                            <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin="dense" size='small' />
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                fullWidth={true}
                                margin="dense"
                                size='small'
                            />



                            <Button variant="outlined" color="secondary" fullWidth={true} margin="dense" component="label" startIcon={<CloudUploadOutlinedIcon />}>
                                Upload Profile Image
                                <input type="file" accept='image/' hidden className="file" />
                            </Button>



                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" fullWidth="true" variant='contained' >
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
                        <Link to="/login" style={{textDecoration: 'none'}}>Login</Link>
                    </CardActions>
                </Card>
            </div>
        </div>


    );
}

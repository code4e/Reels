import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import './ForgotPassword.css';
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { SendPassResetEmail } = useContext(AuthContext);
    
    const navigate = useNavigate();


    const resetPassword = async () => {
        if (!email) {
            setError('Please enter an email');
            setTimeout(() => {
                setError('');
            }, 2000);
            return;
        }

        try {
            setError('');
            setLoading(true);
            let res = await SendPassResetEmail(email);
            setLoading(false);
            navigate("/passwordreset", { state: { passwordResetState: 'Password successfully changed. Please check your email'} })

        } catch (err) {
            setError(err);
            setTimeout(() => {
                setError('');
            }, 2000);
            setLoading(false);
            navigate("/passwordreset", { state: { passwordResetState: 'Oops! Something went wrong.'} })
            return;
        }
    }

    return (
        <div className='forgot-password-cont'>
            <Card sx={{ minWidth: 275 }} className="forgot-pass-card">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Please enter your email address.
                    </Typography>
                    {error !== '' && <Alert severity="error">{error}</Alert>}
                    <TextField id="outlined-basic" type="email" label="Email" variant="outlined" fullWidth={true} margin="dense" size='small' value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={resetPassword} disabled={loading}>Send Password Reest Email</Button>
                </CardActions>
            </Card>



        </div>
    )
}

export default ForgotPassword
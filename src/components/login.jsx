import '../App.css';
import {Box} from '@mui/material';
import MyTextField from './forms/MyTextfield';
import MyPassField from './forms/MyPassfield';
import MyButton from './forms/MyButton';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

import { useForm } from 'react-hook-form';
import axiosInstance from '../../axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';


const Login = () => {
    const navigate = useNavigate();
    const {handleSubmit, control} = useForm();
    const [showMessage, setShowMessage] = useState(false);

    const submission = (data) => {
        axiosInstance.post(
            `login/`, {
                email: data.email,
                password: data.password,
            }
        )
        .then((res) =>{
            console.log(res)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)
            navigate(`/profile`)
        })
        .catch((error) => {
            setShowMessage(true)
            console.error('Error in login', error);
            
        })
    }
    const classes = '';

    return(
        
        <Container component="main" maxWidth="xs" className='py-4'>
        {showMessage ? <Alert severity="warning">Login failed. Please try again or signup</Alert> : null}
			<CssBaseline />
            <div className={classes.paper}>
            <Grid item xs={12}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
                </Grid>
                
            <form onSubmit={handleSubmit(submission)}>

                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MyTextField 
                        label='Email' 
                        name={'email'} 
                        control={control}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <MyPassField 
                        label='Password'
                        name={'password'}
                        control={control}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <MyButton label='Login' type={'submit'}/>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end">
						<Grid item xs={12}>
							<Link to="/signup/" variant="body2">
								You don't have an account? Sign up
							</Link>
						</Grid>
					</Grid>
            </form>
            </div>
        </Container>
    )
}

export default Login;
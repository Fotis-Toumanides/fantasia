import '../App.css';
import {Box} from '@mui/material';
import MyTextField from './forms/MyTextfield';
import MyPassField from './forms/MyPassfield';
import MyButton from './forms/MyButton';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    

    // Validating the data the user enters (names are taken from jsx return code elements name={'email'} )
    const schema = yup
    .object({
        email: yup.string().email('PLease type an email address').required('Email is required'),
        password: yup.string()
                    .required('Password is required')
                    .min(8, 'Password must be at least 8 characters')
                    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                    .matches(/[0-9]/, 'Password must contain at least one number')
                    .matches(/[!@#$%^&*()?,.'<>+|]/, 'Password must contain at least one special character'),
        password2: yup.string().required('Password confirmation is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match exactly')
    })

    const {handleSubmit, control} = useForm({resolver:yupResolver(schema)});

    const submission = (data) => {
        axiosInstance.post(
            `register/`, {
                email: data.email,
                password: data.password,
            }
        )
        .then((res) =>{
            navigate(`/books`)
        })
    }
    const classes = '';

    return(
        <Container component="main" maxWidth="xs" className='pt-4'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
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
                    <MyPassField 
                        label='Confirm Password'
                        name={'password2'}
                        control={control}
                    />
                    </Grid>
                    <Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
                        <Grid item xs={12}>
                        <Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						
					>
						Sign Up
					</Button>
                    </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
						<Grid item xs={12}>
							<Link to="/login/" variant="body2" >
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
              

            </form>
        </div>
        </Container>
    )
}

export default Signup;
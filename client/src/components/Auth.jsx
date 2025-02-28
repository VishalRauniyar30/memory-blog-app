import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { signin, signup } from '../actions/auth'
import { AUTH } from '../constants/actionTypes'
import Input from './Input'

const initialState = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    confirmPassword : '',
}

function Auth() {

    const [formData, setFormData] = useState(initialState)
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShowPassword = () => setShowPassword(!showPassword)
    
    const handleSubmit = (e) => {
        e.preventDefault()

        if(isSignUp){
            dispatch(signup(formData, navigate))

        } else{
            dispatch(signin(formData, navigate))
        }
    }
    const handleChange = (e) => setFormData({ ...formData, [e.target.name] : e.target.value });

    const switchMode = () => {
        setFormData(initialState)
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }

    const googleSuccess = async(res) => {
        const result = res?.profileobj
        const token = res?.tokenId

        try {
            dispatch({ type : AUTH, data : { result, token } })
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = () => console.log('Google Sign In was unsuccessful. Try again later')

    return (
        <Container component='main' maxWidth='xs'>
            <Paper 
                sx={{
                    marginTop: '64px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px 30px',
                    borderRadius: '10px'
                }} 
                elevation={6}
                >
                <Avatar sx={{ margin: '8px', marginTop: '16px', backgroundColor: 'red' }}>
                    <LockOutlinedIcon color='#fff' />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form style={{ width: '100%', marginTop: '24px' }} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                <Input  name='lastName' label='Last Name' handleChange={handleChange} half />
                                <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                            </>
                        )}
                        {!isSignUp && <Input name='email' label='Email Address' handleChange={handleChange} type='email' autoFocus />}
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignUp  && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' sx={{ marginY: '10px' }}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    {/* <Box width='100%'> 
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            width='335px'
                        /> 
                    </Box> */}
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an Account? Sign In' : "Don't have an Account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
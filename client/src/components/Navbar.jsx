import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Box, Button, CardMedia, Toolbar, Typography } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

import memoriesLogo from '../images/memoriesLogo.png'
import memoriesText from '../images/memoriesText.png'
import * as actionType from '../constants/actionTypes'

function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    

    const logout = () => {
        dispatch({ type : actionType.LOGOUT })

        navigate("/auth")
        
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token
        if(token){
            const decodedToken = jwtDecode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                logout()
            }
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar 
            sx={{
                backgroundColor: '#e4821a',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                padding: '10px 50px',
                borderRadius: '15px',
                margin: '30px 0px',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
            position='static' 
            color='inherit' 
        >
            <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
                <CardMedia component='img' src={memoriesText} alt="icon" height="45px" />
                <CardMedia component='img' style={{ marginTop: '5px', marginLeft: '10px' }} src={memoriesLogo} alt="icon" height='40px' />
            </Link>
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', width: { xs: 'auto', sm: '320px' }  }} >
                {user?.result ? (
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: { xs: 'center', sm: 'space-between' }, 
                            width: { xs: 'auto', sm: '320px' },
                            alignItems: 'center',
                            marginTop: { xs: '20px', sm: 0 } 
                        }}
                    >
                        <Avatar sx={{ backgroundColor: '#83e762' }} alt={user?.result.name} src={user?.result.imageUrl}>
                            {user?.result.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography display='flex' alignItems='center' textAlign='center' textTransform='capitalize' variant='h6'>
                            {user?.result.name}
                        </Typography>
                        <Button variant='contained' sx={{ bgcolor: 'red', borderRadius: '5px', ml: 3 }} color='secondary' onClick={logout}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
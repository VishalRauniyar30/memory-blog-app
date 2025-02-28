import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { Box, CircularProgress, Divider, Grid, Typography } from '@mui/material'

import { getPostsByCreator, getPostsBySearch } from '../actions/posts'
import Post from './Post'

function CreatorOrTag() {

    const { name } = useParams()
    const dispatch = useDispatch()
    const { posts, isLoading } = useSelector((state) => state.posts)

    const location = useLocation()

    useEffect(() => {
        if(location.pathname.startsWith('/tags')) {
            dispatch(getPostsBySearch({ tags : name }))
        } else {
            dispatch(getPostsByCreator(name))
        }
    }, [])

    if(!posts.length && !isLoading) {
        return <Typography textAlign='center' fontSize='1.5rem' color='text.secondary'>No Posts</Typography>
    }

    return (
        <Box sx={{ padding: { xs: 2, sm: 4 } }}>
            <Typography 
                variant='h2' 
                sx={{ 
                    marginBottom: 2, 
                    fontWeight: 'bold', 
                    textAlign: 'center', 
                    color: '#e4821a', 
                    textTransform: 'capitalize' 
                    }}
                >
                {name}
            </Typography>
            <Divider sx={{ margin: '20px 0 50px 0' }} />
            {isLoading ? <CircularProgress sx={{ display: 'block', margin: 'auto' }} /> : (
                <Grid 
                    container 
                    justifyContent={{ xs: 'center', sm: 'flex-start' }} 
                    alignItems='stretch' 
                    spacing={3}
                >
                    {posts?.map((post) => (
                        <Grid key={post._id} item xs={12} md={6} lg={4} >
                            <Post post={post} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    )
}

export default CreatorOrTag
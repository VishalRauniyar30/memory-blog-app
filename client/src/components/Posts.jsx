import React from 'react'
import { Grid, CircularProgress, Paper, Box } from '@mui/material'
import { useSelector } from 'react-redux'

import Post from './Post'

function Posts({ setCurrentId }) {
    const { posts, isLoading } = useSelector((state) => state.posts)

    if(isLoading){
        return ( 
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <CircularProgress size='7em' />
            </Box>
        )
    }

    if (!posts.length && !isLoading) return 'No posts'

    return (
        <Grid container alignItems="stretch" spacing={3}>
            {posts?.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    )
}

export default Posts
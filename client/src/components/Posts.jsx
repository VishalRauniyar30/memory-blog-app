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
        <Box 
            sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: 2
            }}
        >
            {posts?.map((post) => (
                <Box key={post._id} sx={{ width: { xs: '100%', sm: '48%', md: '48%', lg: '32%' } }}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Box>
            ))}
        </Box>
    )
}

export default Posts
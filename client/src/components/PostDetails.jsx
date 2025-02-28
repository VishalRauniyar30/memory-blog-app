import React, { useEffect } from 'react'
import { Box, CardMedia, CircularProgress, Divider, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { getPost, getPostsBySearch } from '../actions/posts'
import CommentSection from './CommentSection'

function PostDetails() {
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])
    
    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
        }
    }, [post])
    
    if (!post) return null
    
    const openPost = (_id) => navigate(`/posts/${_id}`)

    if(isLoading){
        return (
            <Paper 
                elevation={6}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    borderRadius: '15px',
                    height: '40vh',
                    backgroundColor : '#fcfcdc'
                }}    
            >
                <CircularProgress size='7em' />
            </Paper>
        )
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id)
    

    return (
        <Paper sx={{ padding: '20px', borderRadius: '15px', bgcolor: '#fcfcdc' }} elevation={6}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    width: '100%',  
                    flexDirection: { xs: 'column', sm: 'row' },
                    flexWrap: { xs: 'wrap', sm: 'nowrap' }
                }}>
                <Box sx={{ flex: 1, margin: '10px', borderRadius: '20px' }}>
                    <Typography variant="h3" component="h2">
                        {post.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
                        {post.tags.map((tag) => (
                            <Box component={Link} to={`/tags/${tag}`} key={tag} sx={{ textDecoration : 'none', color : '#3f51b5' }}>
                                {` #${tag} `}
                            </Box>
                        ))}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {post.message}
                    </Typography>
                    <Typography variant="h6">
                        Created by: 
                        <Box component={Link} to={`/creators/${post.name}`} sx={{ textDecoration : 'none', color : '#3f51b5' }}>
                            {` ${post.name} `}
                        </Box>
                    </Typography>
                    <Typography variant="body1" mt={1}>
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                    <Divider sx={{ margin: '20px 0' }} />
                    <CommentSection post={post} />
                    <Divider sx={{ margin: '20px 0' }} />
                </Box>
                <Box sx={{ marginLeft: { xs: 0, sm: '20px' }, width: '50%', height: 'auto' }}>
                    <CardMedia
                        component='img' 
                        sx={{ borderRadius: '20px', objectFit: 'cover', width: '100%', maxHeight: '600px', backgroundColor: 'wheat' }}
                        src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
                        alt={post.title} 
                    />
                </Box>
            </Box>
            {!!recommendedPosts.length && (
                <Box sx={{ borderRadius: '20px', flex: 1, margin: '10px' }}>
                    <Typography gutterBottom variant="h5">
                        You might also like:
                    </Typography>
                    <Divider />
                    <Box 
                        sx={{
                            margin: '30px 0',
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                            gap: '20px'
                        }}
                    >
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                            <Box 
                                sx={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    backgroundColor: '#f1f3e2',
                                    padding: '15px',
                                    paddingTop: '20px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                    },
                                }}
                                onClick={() => openPost(_id)} 
                                key={_id}
                            >
                                <Typography fontWeight={700} fontSize='1.5rem' marginBottom='5px' gutterBottom variant="h6">
                                    {title}
                                </Typography>
                                <Typography color='goldenrod' margin='5px 0' fontStyle='italic' gutterBottom variant="subtitle2">
                                    {name}
                                </Typography>
                                <Typography color='#333' marginBottom='5px' gutterBottom variant="subtitle2">
                                    {message.split(' ').splice(0, 50).join(' ')}...
                                </Typography>
                                <Typography color='#ff4081' fontWeight={700} gutterBottom variant="subtitle1">
                                    Likes: {likes?.length}
                                </Typography>
                                <CardMedia 
                                    component='img'
                                    src={selectedFile} 
                                    sx={{
                                        width: '100%',
                                        height: '250px',
                                        borderRadius: '10px',
                                        marginTop: '10px'
                                    }}
                                    alt={title} 
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Paper>
    )
}

export default PostDetails

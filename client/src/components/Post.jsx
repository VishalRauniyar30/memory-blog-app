import React, { useState } from 'react'
import { ButtonBase, Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import { deletePost, likePost } from '../actions/posts'

function Post({ post, setCurrentId }) {
    const user = JSON.parse(localStorage.getItem('profile'))

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [likes , setLikes] = useState(post?.likes)

    const userId = user?.result?.googleId || user?.result?._id
    const hasLikedPost = post?.likes?.find((like) => like === userId)


    const handleLike = async () => {
        dispatch(likePost(post._id))
        if(hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId))
        } else {
            setLikes([ ...post.likes, userId ])
        }
    }

    const Likes = () => {
        if (likes?.length > 0) {
            return (
                likes.find((like) => like === userId)
                ? (
                    <>
                        <ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }
                    </>
                ) : (
                    <>
                        <ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
                    </>
                )
            );
        }
        return (
            <>
                <ThumbUpAltOutlined fontSize="small" />&nbsp;Like
            </>
        )
    }
    
    const openPost = (e) => {
        // dispatch(getPost(post._id, history));
        navigate(`/posts/${post._id}`)
    }

    return (
        <Card 
            raised 
            elevation={12}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '10px',
                height: '100%',
                position: 'relative',
                backgroundColor: '#f1f3e2',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                }
            }}
        >
            <ButtonBase
                component="span"
                name="test"
                sx={{
                    display: 'block',
                    textAlign: 'initial'
                }}
                onClick={openPost}
                style={{ display: 'block', textAlign: 'initial' }}
            >
                <CardMedia 
                    sx={{
                        height: 0,
                        paddingTop: '56.25%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backgroundBlendMode: 'darken'
                    }}
                    image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}  
                    title={post.title}
                />
                <Box sx={{ position: 'absolute', top: '20px', left: '20px', color: 'white' }}>
                    <Typography variant='h6'>
                        {post.name}
                    </Typography>
                    <Typography variant='body2'>
                        {moment(post.createdAt).fromNow()}
                    </Typography>
                </Box>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (        
                    <Box sx={{ position: 'absolute', top: '20px', right: '20px', color: 'white' }} name='edit'>
                        <Button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentId(post._id);
                            }}
                            sx={{ color: 'white' }}
                            size="small"
                        > 
                            <MoreHorizIcon fontSize='default' />
                        </Button>
                    </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '25px' }}>
                    <Typography variant='body2' color='textSecondary' component='h2' ml='-8px'>
                        {post.tags.map((tag) =>`#${tag} `)}
                    </Typography>
                </Box>
                <Typography sx={{ padding: '0 16px' }} variant='h5' gutterBottom component='h2'>
                    {post.title}
                </Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {/* {post.message} */}
                        {post.message.split(' ').splice(0, 50).join(' ')}...
                    </Typography>
                </CardContent>
            </ButtonBase>
            <CardActions sx={{ padding: '0 16px 8px 16px', display: 'flex', justifyContent: 'space-between' }}>
                <Button size='small' sx={{ color : 'green' }} disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size='small' sx={{ color : 'red' }} onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize='small' />
                        &nbsp;Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post
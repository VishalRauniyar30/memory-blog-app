import React, { useRef, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'

import { commentPost } from '../actions/posts'

function CommentSection({ post }) {
    const user = JSON.parse(localStorage.getItem('profile'))

    const dispatch = useDispatch()

    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')

    const commentsRef = useRef()

    const handleComment = async () => {
        const finalComment = `${user.result.name}: ${comment}`

        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComment('')
        setComments(newComments)
        
        commentsRef.current.scrollIntoView({ behaviour : 'smooth' })
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {user?.result?.name && (
                    <Box sx={{ width : '100%' }}>
                        <Typography gutterBottom variant='h6'>
                            Write a Comment
                        </Typography>
                        <TextField 
                            fullWidth
                            rows={2}
                            color='secondary'
                            variant='outlined'
                            label='Comment'
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <br />
                        <Button sx={{ marginTop: '10px', backgroundColor: 'darkgreen !important', color: 'white !important' }} fullWidth disabled={!comment} variant='contained' onClick={handleComment}>
                            Comment
                        </Button>
                    </Box>
                )}
                <Box sx={{ height: '200px', overflowY: 'auto', width: '100%', marginTop: 3 }}>
                    <Typography gutterBottom variant='h6'>
                        Comments
                    </Typography>
                    {comments?.map((comment, index) => (
                        <Typography key={index} gutterBottom variant='subtitle1'>
                            <strong>{comment.split(': ')[0]}</strong>
                            {comment.split(':')[1]}
                        </Typography>
                    ))}
                    <Box ref={commentsRef} />
                </Box>
            </Box>
        </Box>
    )
}

export default CommentSection
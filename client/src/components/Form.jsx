import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Paper, Box } from '@mui/material'
import { useDispatch ,useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom'

import ChipInput from './ChipInput'
import { createPost, updatePost } from '../actions/posts.js'

function Form({ currentId, setCurrentId }) {
    const [postData, setPostData] = useState({
        title : '',
        message : '',
        tags : [],
        selectedFile : ''
    })

    const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null))
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate()


    const clear = () => {
        setCurrentId(0)
        setPostData({ title : '', message : '', tags : [], selectedFile : ''})
    }

    useEffect(() => {
        if(!post?.title) {
            clear()
        }
        if(post) {
            setPostData(post)
        }
    } ,[post])

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }, navigate))
            clear()

        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
            clear()
        }
    }
    
    if(!user?.result?.name){
        return (
            <Paper sx={{ padding: '16px', borderRadius: '10px' }} elevation={6}>
                <Typography variant='h6' align='center'>
                    Please Sign In to Create Your Own Memories and Like Other's Memories
                </Typography>
            </Paper>
        )
    }

    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] })
    }
    
    const handleDeleteChip = (chipToDelete) => {
        setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) })
    }

    return (
        <Paper sx={{ padding: '16px', borderRadius: '10px' }} elevation={6}>
            <Box 
                autoComplete='off' 
                noValidate 
                sx={{
                    '& .MuiTextField-root': {
                        margin: '8px'
                    },
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}
                onSubmit={handleSubmit}
            >
                <Typography variant='h6'>
                    {currentId ? `Editing "${post.title}"` : "Creating a Memory"}
                </Typography>
                <TextField 
                    name='title' 
                    variant='outlined' 
                    label='Title' 
                    fullWidth
                    color='secondary'
                    value={postData.title}
                    onChange={(e) => setPostData({
                        ...postData,
                        title : e.target.value
                    })}
                />
                <TextField 
                    name='message' 
                    variant='outlined' 
                    label='Message' 
                    color='secondary'
                    fullWidth
                    multiline
                    rows={4}
                    value={postData.message}
                    onChange={(e) => setPostData({
                        ...postData,
                        message : e.target.value
                    })}
                />
                {/* <div style={{ padding: '5px 0', width: '95%', paddingRight: '15px' }}>
                    <ChipInput
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip) => handleDeleteChip(chip)}
                    />
                </div> */}
                <TextField 
                    name='tags'
                    variant='outlined' 
                    label='Tags (comma separated)' 
                    fullWidth
                    color='secondary'
                    value={postData.tags}
                    onChange={(e) => setPostData({
                        ...postData,
                        tags : e.target.value.split(',') 
                    })}
                />
                <Box sx={{ width: '97%', margin: '10px 0' }}>
                    <FileBase 
                        type='file'
                        multiple={false}
                        color='secondary'
                        onDone={({ base64 }) => setPostData({
                            ...postData,
                            selectedFile : base64
                        })}
                    />
                </Box>
                <Button 
                    sx={{ marginBottom: '10px', backgroundColor: 'slategrey' }}
                    variant='contained'
                    color='primary'
                    size='large'
                    type='submit'
                    fullWidth
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <Button 
                    sx={{ padding: '8px', backgroundColor: 'crimson' }}
                    variant='contained'
                    color='secondary'
                    size='small'
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>
            </Box>
        </Paper>
    )
}

export default Form
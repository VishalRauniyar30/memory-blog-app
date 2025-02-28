import React, { useState } from 'react'
import { AppBar, Box, Button, Container, Grid, Grow, Paper, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import ChipInput from './ChipInput'
import { getPostsBySearch } from '../actions/posts'
import { Form, Paginate, Posts } from '.'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Home() {
    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')


    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const navigate = useNavigate()

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            navigate('/')
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    };
    
    const handleAddChip = (tag) => setTags([...tags, tag])
    
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete))


    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid 
                    container 
                    justifyContent='space-between' 
                    alignItems='stretch' 
                    spacing={3} 
                    display='flex' 
                    flexDirection={{ xs: 'column-reverse', md: 'row' }}
                >   
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar 
                            position="static" 
                            color="inherit"
                            sx={{ 
                                borderRadius: '4px',
                                marginBottom: '1rem',
                                display: 'flex',
                                padding: '16px'
                            }}
                        >
                            <TextField 
                                onKeyDown={handleKeyPress} 
                                color='secondary' 
                                name="search" 
                                variant="outlined" 
                                label="Search Memories" 
                                fullWidth 
                                value={search} 
                                onChange={(e) => setSearch(e.target.value)} 
                            />
                            <Box mt='15px'>
                                <ChipInput
                                    value={tags}
                                    color='secondary'
                                    onAdd={(chip) => handleAddChip(chip)}
                                    onDelete={(chip) => handleDeleteChip(chip)}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                            </Box>
                            <Button 
                                onClick={searchPost} 
                                sx={{ bgcolor: 'springgreen' }}
                                variant="contained" 
                                color="primary"
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form 
                            currentId={currentId} 
                            setCurrentId={setCurrentId} 
                        />
                        {(!searchQuery && !tags.length) && (
                            <Paper sx={{ borderRadius: '10px', marginTop: '1rem', padding: '16px' }} elevation={6}>
                                <Paginate page={page} />
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={9} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
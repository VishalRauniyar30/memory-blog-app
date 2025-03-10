import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, PaginationItem } from '@mui/material'
import { Link } from 'react-router-dom'

import { getPosts } from '../actions/posts'

function Paginate({ page }) {
    const { numberOfPages } = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page))
        }
    }, [dispatch, page])
    
    return (
        <Pagination
            sx={{ ul: { justifyContent: 'space-around' } }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="standard"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate
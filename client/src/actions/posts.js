import * as api from '../api/index.js'
import { COMMENT, CREATE, DELETE, END_LOADING, 
    FETCH_ALL, FETCH_BY_CREATOR, FETCH_BY_SEARCH, 
    FETCH_POST, LIKE, START_LOADING, UPDATE 
} from '../constants/actionTypes'
//Action Creators

const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
    
        const { data } = await api.fetchPost(id)
    
        dispatch({ type: FETCH_POST, payload: { post: data } })

    } catch (error) {
        console.log(error)
    }
};

const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page)
    
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } })
        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log(error)
    }
}

const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery)
    
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } })
        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log(error)
    }
};

const getPostsByCreator = (name) => async (dispatch) => {
    try {
        dispatch({ type : START_LOADING })
        const { data : { data } } = await api.fetchPostsByCreator(name)

        dispatch({ type : FETCH_BY_CREATOR, payload : { data } })

        dispatch({ type : END_LOADING })

    } catch (error) {
        console.log(error)
    }
}



const createPost = (post, navigate) => async(dispatch) => {
    try {
        dispatch({ type : START_LOADING })
        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data })

        navigate(`/posts/${data._id}`)
    } catch (error) {
        console.log(error)
    }
}
const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type : UPDATE, payload : data })

    } catch (error) {
        console.log(error)
    }
}

const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    try {
        const { data } = await api.likePost(id, user?.token)
        dispatch({ type : LIKE , payload : data })

    } catch (error) {
        console.log(error)
    }
}

const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type : DELETE, payload : id })

    } catch (error) {
        console.log(error)
    }
}

const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPost(value, id)

        dispatch({ type : COMMENT, payload : data })

        return data.comments

    } catch (error) {
        console.log(error)
    }
} 


export {
    getPost,
    getPostsBySearch,
    getPostsByCreator,
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    commentPost
}
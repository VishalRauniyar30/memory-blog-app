import { COMMENT, CREATE, DELETE, END_LOADING, 
    FETCH_ALL, FETCH_BY_CREATOR, FETCH_BY_SEARCH, 
    FETCH_POST, LIKE, START_LOADING, UPDATE 
} from "../constants/actionTypes";

const posts = (state = { isLoading : true, posts : [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload.data };
        case FETCH_BY_CREATOR:
            return { ...state, posts: action.payload.data };
        case FETCH_POST:
            return { ...state, post: action.payload.post };
        case LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case COMMENT :
            return {
                ...state,
                posts : state.posts.map((post) => {
                    //change the post that just received a comment...
                    if(post._id === action.payload._id){
                        return action.payload
                    }
                    //return all the other posts normally...
                    return post
                })
            };
        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
}
export default posts
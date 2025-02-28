import { AUTH, AUTH_ERROR, LOGOUT } from "../constants/actionTypes"

const authReducer = (state = { authData : null }, action) => {
    switch(action.type) {
        case AUTH :
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state , authData : action.data, loading : false, errors : null }

        case LOGOUT :
            localStorage.clear()
            return { ...state , authData : null, loading : false, errors : null }

        case AUTH_ERROR:
            return { ...state, authData: null, errors: action.payload }
        default :
            return state
    }
}

export default authReducer
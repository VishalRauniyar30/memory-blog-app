import * as api from '../api/index.js'
import { AUTH, AUTH_ERROR } from '../constants/actionTypes'


const signin = (formData, navigate) => async(dispatch) => {
    try {

        const { data } = await api.signIn(formData)
        dispatch({ type : AUTH , data })
        navigate('/')

    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.response?.data?.message || "Login failed" })
        console.log(error)
    }
}
const signup = (formData, navigate) => async(dispatch) => {
    try {
        //sign up the user..
        const { data } = await api.signUp(formData)
        dispatch({ type : AUTH, data })
        navigate('/')
        
    } catch (error) {
        dispatch({ type: "AUTH_ERROR", payload: error.response?.data?.message || "Login failed" })
        console.log(error)
    }
}


export {
    signin,
    signup
}

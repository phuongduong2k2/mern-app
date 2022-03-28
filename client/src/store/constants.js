export const apiUrl = 
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'https://hidden-cliffs-24505.herokuapp.com/api'

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";
export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER"
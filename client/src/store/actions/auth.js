import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
} from "../constants";

import AuthService from "../../services/auth.service";

export const login = (userForm) => async (dispatch) => {
    try {
        const response = await AuthService.login(userForm);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response
        });
        return response
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        })
        return error.response.data
    }
}

export const register = (userForm) => async (dispatch) => {
    try {
        const response = await AuthService.register(userForm)
        dispatch({
            type: REGISTER_SUCCESS,
        })
        return response
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
        })
        return error.response.data
    }
} 

export const logout = () => async (dispatch) => {
    try {
        AuthService.logout();
        dispatch({
            type: LOGOUT,
        })
    } catch (error) {
        console.log(error);
    }
    
}
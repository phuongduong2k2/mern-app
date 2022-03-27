import {
    SET_USER,
    REMOVE_USER
} from "./types";

import AuthService from "../../services/auth.service";

export const loadUser = () => async (dispatch) => {
    try {
        const response = await AuthService.loadUser();
        await dispatch({
            type: SET_USER,
            payload: response
        })
        return response
    } catch (error) {
        dispatch({
            type: REMOVE_USER
        })
        return error
    }
}
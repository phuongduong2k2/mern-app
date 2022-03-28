import {
    REMOVE_USER,
    SET_USER
} from "../constants";

const id = localStorage.getItem('id')

const initialStateUser = id 
    ? { 
        username: localStorage.getItem('username'),
        id,
        createdAt: localStorage.getItem('createdAt'),
        image: localStorage.getItem('image')
    } 
    : { data: null }

export default function userReducers(state = initialStateUser, action) {
    const {type, payload} = action;
    switch(type) {
        case SET_USER:
            return {
                ...state,
                username: payload.user.username,
                id: payload.user._id,
                createdAt: payload.user.createdAt,
                image: payload.user.image
            };
        case REMOVE_USER:
            return {
                ...state,
                username: null,
                id: null,
                createdAt: null,
                image: null
            }
        default:
            return state
    }
}
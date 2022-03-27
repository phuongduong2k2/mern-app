import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/auth";

const loadUser = async () => {
    const response = await axios.get(API_URL, { headers: authHeader() })
    localStorage.setItem('username', response.data.user.username)
    localStorage.setItem('id', response.data.user._id)
    localStorage.setItem('createdAt', response.data.user.createdAt)
    localStorage.setItem('image', response.data.user.image)
    return response.data
}

const login = async (userForm) => {
    const response = await axios.post(API_URL + '/login', userForm);
    if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
    }
    return response.data;
}

const register = async (userForm) => {
    const response = await axios.post(API_URL + '/register', userForm);
    return response.data
}

const logout = () => {
    localStorage.clear()
}

const AuthService = {
    login,
    register,
    loadUser,
    logout
};

export default AuthService
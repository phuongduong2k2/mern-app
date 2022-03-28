import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Checkbox } from 'antd';
import Notify from '../components/Notify/Notify';
import { useDispatch } from 'react-redux'
import { login } from '../../store/actions/auth'


const Login = () => {
    // Context
    const [loading, setLoading] = useState(false)
    const [userForm, setUserForm] = useState({
        username: "",
        password: ""
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value.replace(/\s+/g, '')
        })
    }

    const handleChecked = (e) => {
        console.log(e.target.checked);
    }
    const handleLogin = () => {
        setLoading(true)
        dispatch(login(userForm))
            .then((res) => {
                if (res.status) {
                    Notify.success("Sign in success", { timeOut: 1000 })
                    console.log(res);
                    return navigate('/home')
                } else {
                    Notify.error(res.message)
                }
                setLoading(false)
            })
            
    }

    return (
        <div className='body'>
            <h1 className='ques'>have an account?</h1>
            <div className='flex-vertical'>
                <Input
                    name='username'
                    value={userForm.username}
                    onPressEnter={() => handleLogin()}
                    onChange={(e) => handleChange(e)}
                    placeholder='Username'
                />
                <Input
                    name='password'
                    value={userForm.password}
                    onPressEnter={() => handleLogin()}
                    onChange={(e) => handleChange(e)}
                    type='password'
                    placeholder='Password'
                />
                <Button 
                    type="primary" 
                    shape="round"
                    className='btn-login'
                    loading={loading}
                    onClick={() => handleLogin()}
                >
                    SIGN IN
                </Button>
            </div>
            <div className='flex-between mt-3'>
                <Checkbox 
                    onChange={(e) => handleChecked(e)} 
                    style={{color: '#fbceb5', fontSize: '18px'}}
                >
                    Remember Me
                </Checkbox>
                <Link 
                    to='/' 
                    style={{color: "white", fontSize: '18px'}}
                >
                    Forgot Password
                </Link>
            </div>
            <Link 
                to='/register'
                style={{color: '#fbceb5', fontSize: '18px'}}
            >
                Sign Up
            </Link>
            <span style={{color: 'white', fontSize: '18px'}}>-Or Sign In With-</span>
            <div className='footer'>
                <a className='btn' href='https://www.facebook.com/'>Facebook</a>
                <a className='btn' href='https://twitter.com/'>Twitter</a>
            </div>
        </div>
    )
}

export default Login
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from 'antd'
import Notify from '../components/Notify/Notify'
import { useDispatch } from 'react-redux'
import { register } from '../../store/actions/auth'

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [userForm, setUserForm] = useState({
        username: '',
        password: '',
        repassword: ''
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserForm({
            ...userForm,
            [e.target.name]: e.target.value.replace(/\s+/g, '')
        })
    }

    const handleRegister = async () => {
        if (!userForm.username || !userForm.password) return Notify.error("Try again", 'Missing username or password', { timeOut: 2000 })
        if (userForm.password.length < 4) return Notify.error("Try again", 'Password must be at least 4 letters', { timeOut: 2000 })
        if (userForm.password !== userForm.repassword) return Notify.error("Try again", 'Password do not match', { timeOut: 2000 })
        setLoading(true)
        dispatch(register(userForm))
            .then((res) => {
                if (res.status) {
                    Notify.success("Please login", "Sign up success", { timeOut: 2000 })
                    return navigate("/login")
                } else Notify.error(res.message)
            })
        setLoading(false)
    }

    return (
        <div className='body'>
            <h1 className='ques'>create new account</h1>
            <div className='flex-vertical'>
                <Input
                    placeholder='Username'
                    name='username'
                    value={userForm.username}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={userForm.password}
                    onChange={(e) => handleChange(e)}
                />
                <Input
                    type='password'
                    placeholder='Confirm password'
                    name='repassword'
                    value={userForm.repassword}
                    onChange={(e) => handleChange(e)}
                    onPressEnter={() => handleRegister()}
                />
                <Button 
                    type="primary" 
                    shape="round"
                    loading={loading}
                    className='btn-login'
                    onClick={() => handleRegister()}
                >
                    REGISTER
                </Button>
            </div>
            <Link 
                to='/login'
                style={{color: '#fbceb5', fontSize: '18px', marginTop: '10px'}}
            >
                Log In
            </Link>
        </div>
    )
}

export default Register
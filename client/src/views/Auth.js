import React from 'react'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'


export const Auth = ({ authRoute }) => {
    let render

    render = (
        <>
            {authRoute === 'login' && <Login/>}
            {authRoute === 'register' && <Register/>}
        </>
    )


    return (
        <div className='landing'>
            <div className='login-wrap'>
                <div className='header'>
                    <h1>{ authRoute === 'login' ? "Log In" : "Sign up" }</h1>
                </div>
                {render}
            </div>
        </div>
    )
}

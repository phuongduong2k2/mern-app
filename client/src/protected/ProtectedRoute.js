import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { loadUser } from '../store/actions/user';
import Navbar from '../components/layout/Navbar'
import { Layout } from 'antd';

const ProtectedRoute = () => {
    const { Header, Content } = Layout;
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)

    useEffect( () => {
        dispatch(loadUser())
    }, [])

    return (
        isLoggedIn 
            ?   <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <Navbar />
                    </Header>
                    <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                        <Outlet/>
                    </Content>
                </Layout>
            :   <Navigate to='login'/>
        
    )
}

export default ProtectedRoute
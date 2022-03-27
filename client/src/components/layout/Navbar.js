import React from 'react'
import { 
  AppstoreOutlined, 
  BellOutlined, 
  ExclamationCircleOutlined, 
  HomeOutlined, 
  LogoutOutlined, 
  MessageOutlined, 
  TeamOutlined, 
  UserOutlined, 
  WeiboCircleOutlined 
} from '@ant-design/icons'
import { Button, Menu, Modal, Tooltip  } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/auth';

const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const user = useSelector(state => state.user)
  
  // LOGOUT
  const handleLogout = () => {
    Modal.confirm({
      title: 'Do you want to exist!',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(logout())
        return navigate('/login')
      },
    });
  }

  let url = window.location.href.slice(22)

  return (
    <div className='navbar'>
      <div className='left-side'>
        <WeiboCircleOutlined 
          style={{fontSize: '30px', paddingRight: '10px'}}
        />
        <h1 style={{color: 'white', margin: 0}}>Social Media</h1>
      </div>
      <div className='middle'>
        <Menu className='menu' theme='dark' mode="horizontal" defaultSelectedKeys={url}>
          <Menu.Item key="home" className='item'>
            <Link to='/home'><HomeOutlined style={{fontSize: '25px'}}/>
              <Tooltip placement="bottom" title='Home'>
                <div style={{height: "60px", width: "140px", marginLeft: "-20px", position: "absolute", marginTop: '-65px'}}></div>
              </Tooltip>
            </Link>
          </Menu.Item>
          <Menu.Item key="groups" className='item' style={{position: 'relative'}}>
            <Link to='/groups'><TeamOutlined style={{fontSize: '25px'}}/>
              <Tooltip placement="bottom" title='Groups'>
                <div style={{height: "60px", width: "140px", marginLeft: "-20px", position: "absolute", marginTop: '-65px'}}></div>
              </Tooltip>
            </Link>
          </Menu.Item>
          <Menu.Item key="profile" className='item'>
            <Link to='/profile'><UserOutlined style={{fontSize: '25px'}}/>
              <Tooltip placement="bottom" title='Profile'>
                <div style={{height: "60px", width: "140px", marginLeft: "-20px", position: "absolute", marginTop: '-65px'}}></div>
              </Tooltip>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className='right-side'>
        <h1 style={{color: 'white', margin: 0, marginRight: '10px'}}>{user.username}</h1>
        <Tooltip placement="bottom" title='More'>
          <AppstoreOutlined className='item' style={{fontSize: '25px'}}/>
        </Tooltip>
        <Tooltip placement="bottom" title='Message'>
          <MessageOutlined className='item' style={{fontSize: '25px'}}/>
        </Tooltip>
        <Tooltip placement="bottom" title='Notification'>
          <BellOutlined className='item' onClick={() => console.log('Notify')} style={{fontSize: '25px'}}/>
        </Tooltip>
        <Button
          icon={<LogoutOutlined />}
          onClick={() => handleLogout()}
        >Log Out</Button>
      </div>
    </div>
  )
}

export default Navbar
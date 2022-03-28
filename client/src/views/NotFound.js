import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='none'>
      <div className='center'>
        <h1 style={{color: "#444444", fontSize: "150px", margin: "0"}}>404</h1>
        <h1 style={{color: "#444444", fontSize: "50px", margin: "0"}}>Not Found</h1>
        <Button
          type='primary'
          onClick={() => navigate('/home')}
        >
          Return To Home
        </Button>
      </div>
    </div>
  )
}

export default NotFound
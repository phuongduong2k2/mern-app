import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  useEffect(() => {
    console.log("lifecycle");
    navigate('/login')
  })
  return (
    <></>
  )
}

export default Landing
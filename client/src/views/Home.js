import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CreatePost from '../components/posts/CreatePost/CreatePost'
import SinglePost from '../components/posts/SinglePost'
import { Skeleton } from 'antd';
import { apiUrl } from '../store/actions/constants';


const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  const handlePosts = async () => {   
    try {
      const response = await axios.get(`${apiUrl}/posts/all`)
      const posts = response.data.posts
      setPosts(posts.reverse())
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handlePosts()
  }, [])

  const handleDeletePost = (index) => {
    const newPosts = posts.filter((post,ind) => ind !== index ? {...post} : null);
    setPosts(newPosts)
  }

  const _renderPosts = () => {
    if (posts.length >= 1) {
      return Object.values(posts).map((post, index) => {
        return (
          <SinglePost 
            post={post} 
            key={post._id} 
            id={post._id}
            index={index}
            handleDeletePost={handleDeletePost}
          />
        )
      })
    } else if (isLoading) {
      return (
        <div style={{width: '40%'}}>
          <Skeleton active avatar paragraph={{ rows: 6 }}/>
        </div>
      )
    } else return (
      <h1>There are no post yet!</h1>
    )
  }

  
  return (
    <div className='home-page'>
      <div className='main mt-3'>
        <CreatePost/>
        {_renderPosts()}
      </div> 
    </div>
  )
}

export default Home
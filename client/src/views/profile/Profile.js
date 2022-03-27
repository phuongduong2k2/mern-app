import React, { useEffect, useState } from 'react'
import { Button, Image, Dropdown, Menu, Skeleton } from 'antd'
import { useSelector } from 'react-redux'
import authHeader from '../../services/auth-header'
import ModalCustom from './ModalCustom'
import axios from 'axios'
import SinglePost from '../../components/posts/SinglePost'
import { UserOutlined } from '@ant-design/icons'
import { apiUrl } from '../../store/actions/constants'


const Profile = () => {

  const [type, setType] = useState()
  const [visible, setVisible] = useState(false)
  const profile = useSelector(state => state.user)
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [idPost, setIdPost] = useState()

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => setVisible(true)}>View profile pictures</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={() => handleOpenModal('upload')}>Change profile pictures</Menu.Item>
    </Menu>
  )

  const handleOpenModal = (type, id) => {
    setType(type)
    if (id) setIdPost(id)
  }

  const handleCancel = () => {
    setType(null)
    setIdPost(null)
  }

  useEffect(() => {
    handlePosts()
  }, [])

  const handlePosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`, { headers: authHeader() })
      const posts = response.data.posts;
      setPosts(posts.reverse())
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  } 

  const handleDeletePost = (index) => {
    const newPosts = posts.filter((post,ind) => ind !== index ? {...post} : null);
    setPosts(newPosts)
  }

  const ImagePreview = () => {
    return (
      <Image
        style={{width: '150px', height: '150px', borderRadius: '100px'}}
        id='img_preview'
        src={`${profile?.image}`}
        preview={{  
          visible,
          src: `${profile?.image}`,
          onVisibleChange: value => {
            setVisible(value);
          },
        }}
      />
    );
  }

  const _renderPosts = () => {
    if (posts.length >= 1) {
      return Object.values(posts).map((post,index) => {
        return (
          <SinglePost 
            post={post} 
            key={post?._id} 
            id={post?._id}
            index={index}
            handleOpenModal={handleOpenModal}
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

  const _renderPreview = () => {
    if (profile?.image) return <ImagePreview/>
    else return (
      <div style={{width: '150px', height: '150px', borderRadius: '100px', border: '1px solid black', backgroundColor: 'white'}} className='flex'>
        <UserOutlined 
        style={{fontSize: '90px'}}/>
      </div>
    )
  }

  return (
    <div style={{backgroundColor: "white", height: "170px"}} className='wallpaper'>
      <div style={{display: "flex", padding: "10px"}}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button
            style={{
              height: '150px', 
              width: "150px" , 
              zIndex: 1, 
              opacity: 0,
              position: "absolute",
            }}
          >
            <span></span>
          </Button>
        </Dropdown>
        {_renderPreview()}
        <h1 style={{fontSize: '50px', color: "white"}}>{profile?.username}</h1>
      </div>
      <ModalCustom 
        type={type}
        userId={profile?.id}
        id={idPost}
        handleCancel={handleCancel}
      />
      <div className='main mt-3'>
        {_renderPosts()}
      </div>
    </div>
  )
}

export default Profile
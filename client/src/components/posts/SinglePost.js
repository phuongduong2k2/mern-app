import React, { useState } from 'react'
import moment from 'moment';
import { CommentOutlined, EllipsisOutlined, ExclamationCircleOutlined, LikeOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, Modal } from 'antd'
import axios from 'axios';
import authHeader from '../../services/auth-header';
import Notify from '../../untils/Notify/Notify';
import { apiUrl } from '../../store/actions/constants';

const SinglePost = ({post : {title, description, createdAt, username, image}, id, handleDeletePost, index, handleOpenModal}) => {

  const [isTruncated, setIsTruncated] = useState(true)

  const menu = (
    <Menu>
      <Menu.Item 
        key="1" 
        onClick={() => handleOpenModal('edit', id)}
      >
        Edit post
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item 
        key="2" 
        onClick={() => Modal.confirm({
          title: 'Are you sure to delete this post!',
          icon: <ExclamationCircleOutlined />,
          onOk() {
            handleDelete()
          },
        })}
      >
        Delete post
      </Menu.Item>
    </Menu>
  )

  const url = window.location.href.slice(22)

  const handleDelete = async () => {
    try {
      
      const response = await axios.delete(`${apiUrl}/posts/${id}`, { headers: authHeader() })
      handleDeletePost(index)
      Notify.success("", "Delete post success", {timeOut: 1000})
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const _renderDescription = (x) => {
    if (x?.length > 200) {
      let descrip = isTruncated ? x.substr(0, 200) : x
      return (
        <h3>{descrip}<a onClick={() => setIsTruncated(!isTruncated)}> ...Show { isTruncated ? "more" : "less"}</a></h3>
      )
    } else return <h3>{x}</h3>
  }

  return (
    <div className='post'>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
        <div className='title'>
          {
            image
              ? <img src={`${image}`} className="avatar" alt=''/>
              : <UserOutlined className='avatar'/>
          }
          <div className='info'>
            <span className='username'>{username}</span>
            <span className='time'>{moment(createdAt).startOf().fromNow()}</span>
          </div>
        </div>
        {
          url === 'profile'
          && <Dropdown overlay={menu} trigger={['click']}>
              <Button
                icon={<EllipsisOutlined />}
              />
            </Dropdown>
        }
      </div>
      <div className='content'>
        <h2>{title}</h2>
        {_renderDescription(description)}
      </div>
      <div className='action'>
        <Button
          className='btn-action'
          icon={<LikeOutlined className='icon'/>}
        >
          Like
        </Button>
        <Button
          className='btn-action'
          icon={<CommentOutlined className='icon'/>}
        >
          Comment
        </Button>
        <Button
          className='btn-action'
          icon={<SendOutlined className='icon'/>}
        >
          Share
        </Button>
      </div>
    </div>
  )
}

export default SinglePost
import React, { useState } from 'react'
import { Modal, Button, Input } from 'antd'
import axios from 'axios'
import authHeader from '../../../services/auth-header'
import Notify from '../../../untils/Notify/Notify'

const ModalCustom = ({visible, onClose, user}) => {
    const [post, setPost] = useState({
        title: '',
        description: ''
    })

    const handleOk = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/posts', 
                { 
                    title: post.title,
                    description: post.description,
                    url: "abcxyz",
                    username: user.username,
                    image: `${user.image}`
                },
                { headers: authHeader() }
            )
            onClose()
            console.log(user);
            console.log(response);
            Notify.success(
                "", 
                'Post success',
                {
                  showDuration: 300,
                  hideDuration: 300,
                  timeOut: 1000,
                  extendedTimeOut: 1000,
                  progressBar: true,
                  onHidden: function () {
                    window.location.reload();
                }
              });
        } catch (error) {
            console.log(error);
            Notify.error(
                "Try again",
                "Something wrong",
                {
                    timeOut: 2000
                }
            )
        }
    }

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleCancel = () => {
        onClose()
    }

    const _renderFooter = () => (
        [
            <Button
                key='post'
                type='primary'
                style={{width: '100%'}}
                onClick={() => handleOk()}
            >
                Post
            </Button>
        ]
    )

    return (
        <Modal 
            title="Create New Post" 
            visible={visible} 
            onCancel={handleCancel}
            footer={_renderFooter()}
        >
            <div className='modal'>
                <div className='mb-2'>
                    <Input
                        name='title'
                        onChange={(e) => handleChange(e)}
                        placeholder='What do you think?'
                    />
                </div>
                <div>
                    <Input.TextArea
                        name='description'
                        onPressEnter={() => handleOk()}
                        onChange={(e) => handleChange(e)}
                        placeholder='Description'
                        autoSize={{ minRows: 3, maxRows: 10 }}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default ModalCustom
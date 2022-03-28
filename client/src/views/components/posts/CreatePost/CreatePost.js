import { Button } from 'antd'
import React, { useState } from 'react'
import { FileImageOutlined, SmileOutlined, VideoCameraOutlined } from '@ant-design/icons'
import ModalCustom from './ModalCustom'
import { useSelector } from 'react-redux'


const CreatePost = () => {
    const [visible, setVisible] = useState(false)
    const user = useSelector(state => state.user)


    const handleOpenModal = () => {
        setVisible(true)
    }

    const handleCancelModal = () => {
        setVisible(false)
    }

    return (
        <div className='create-post'>
            <Button
                type='primary'
                style={{width: "80%"}}
                onClick={() => handleOpenModal()}
            >
                Create new post
            </Button>
            <div className='footer'>
                <Button
                    className='btn-action'
                    icon={<VideoCameraOutlined style={{color: "red", fontSize: '20px'}}/>}
                >
                    Live Stream
                </Button>
                <Button
                    className='btn-action'
                    icon={<FileImageOutlined style={{color: "#45bd62", fontSize: '20px'}}/>}
                >
                    Photo/Video
                </Button>
                <Button
                    className='btn-action'
                    icon={<SmileOutlined style={{color: "orange", fontSize: '20px'}}/>}
                >
                    Reaction
                </Button>
            </div>
            <ModalCustom 
                visible={visible}
                onClose={handleCancelModal}
                user={user}
            />
        </div>
    )
}

export default CreatePost
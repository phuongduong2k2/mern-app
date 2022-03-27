import React from 'react' 
import { Upload, message, Modal, Button, Input } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import authHeader from '../../services/auth-header';
import axios from 'axios';
import Notify from '../../untils/Notify/Notify'

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class ModalCustom extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { loading, imageUrl, title, description } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    
    const uploadProfilePicture = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/api/auth/profile/${localStorage.getItem('id')}`, 
            { image: `${imageUrl}`,
              userId: this.props.userId
            },
            { headers: authHeader() }
          )
          Notify.success(
            "", 
            'Upload picture success',
            {
              timeOut: 1200,
              progressBar: true,
              onHidden: function () {
                window.location.reload();
            }
          });
          handleCancel()
          console.log(response);
      } catch (error) {
          console.log(error.response);
          if (error.response.statusText === "Payload Too Large") 
          Notify.error("Image must smaller than 2MB!", "Try again")
      }
    }

    const updatePost = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/api/posts/${this.props.id}`,
            { 
              title: title,
              description: description
            },
            { headers: authHeader() })
        Notify.success(
          "", 
          "Update post success", 
          {
            timeOut: 1200,
            progressBar: true,
            onHidden: function () {
              window.location.reload();
            }
          },
        )
        console.log(response);
        handleCancel()
      } catch (error) {
        console.log(error.response);
        Notify.error(
          "Try again",
          "Something wrong",
          {
              timeOut: 2000
          }
      )
      }
    }

    const handleOk = () => {
      console.log(this.props.type);
      if (this.props.type === 'upload') uploadProfilePicture()
      else if (this.props.type === 'edit') updatePost()
    }

    const handleCancel = () => {
        this.setState({
            imageUrl: ""
        })
        this.props.handleCancel()
    }

    const _renderFooter = () => (
        [
            <Button
                key='post'
                type='primary'
                style={{width: '100%'}}
                loading={loading}
                onClick={() => handleOk()}
                disabled={this.props.type === 'upload' ? !imageUrl : false}
            >
              {this.props.type === 'upload' ? "Upload" : "Ok"}
            </Button>
        ]
    )

    const handleChange = (e) => {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value
      })
    }

    const _renderModal = () => {
      if (this.props.type === "upload") {
        return (
          <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={`http://localhost:5000/api/auth/profile`}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        )
      } else {
        return (
          <>
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
                  onPressEnter={() => updatePost()}
                  onChange={(e) => handleChange(e)}
                  placeholder='Description'
                  autoSize={{ minRows: 3, maxRows: 10 }}
              />
            </div>
          </>
        )
      }
    }

    return (    
        <Modal
            title={this.props.type === 'upload' ? "Upload Profile Picture" : "Edit Post"}
            visible={['upload', 'edit'].includes(this.props.type)}
            onCancel={handleCancel}
            footer={_renderFooter()}
        >
            {_renderModal()}
        </Modal>
      
    );
  }
}

export default ModalCustom
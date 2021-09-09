import React from 'react';
import { Upload, message, Avatar, Tooltip } from 'antd';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
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

class AvatarUpload extends React.Component {
  state = {
    loading: false,
    imageUrl: undefined,
  };

  handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div style={{ cursor: 'pointer' }}>
        <Avatar size={102} icon={<UserOutlined />} />
        {/* <div style={{ zIndex: 1 }}>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>上传头像</div>
        </div> */}
      </div>
    );
    return (
      <ImgCrop rotate shape="round">
        <Upload
          name="avatar"
          // listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action=""
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          <Tooltip title="点击上传头像">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: 102,
                  borderRadius: 61,
                  cursor: 'pointer',
                }}
              />
            ) : (
              uploadButton
            )}
          </Tooltip>
        </Upload>
      </ImgCrop>
    );
  }
}
export default AvatarUpload;


import './styles.scss';
import { Form, Input, Button, Upload, DatePicker, TimePicker, Select, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from 'react';
import { useDispatch, connect} from "react-redux";
import { ACTIONS } from "redux/creators/youtube/actions";

const { Option } = Select ;

const YoutubeUploadForm = ({title, 
  description, 
  thumbnail, 
  tags, 
  scheduleDate, 
  scheduleTime, 
  forChild, 
  country, 
  category, 
  defaultLanguage, 
  statsVisible, 
  license, 
  notifySubscriber, 
  privacyStatus, 
  approvalStatus, 
  uploadStatus
}) => {  
  
  const [formDataYT, setFormDataYT] = useState({
    title:title, 
    description:description, 
    thumbnail:thumbnail, 
    tags:tags, 
    scheduleDate: scheduleDate, 
    scheduleTime: scheduleTime, 
    forChild: forChild, 
    country: country, 
    category: category, 
    defaultLanguage: defaultLanguage, 
    statsVisible: statsVisible,
    license: license,
    notifySubscriber: notifySubscriber,
    privacyStatus: privacyStatus,
    approvalStatus: approvalStatus,
    uploadStatus: uploadStatus
  });

  const dispatch = useDispatch();

    useEffect(() => {
      dispatch({
        type: ACTIONS.GET_FORM_ADMIN
      });
    }, [dispatch]);

  const onFinish = () => {
    try{
      dispatch({
        type: ACTIONS.SET_FORM,
        payload: {...formDataYT}
      });
    }catch(e){
      alert(e);
    }
    };
    
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleTitleChange = (e) => {
    setFormDataYT({...formDataYT, title:e.target.value});
  }

  const handleDescriptionChange = (e) => {
    setFormDataYT({...formDataYT, description:e.target.value});
  }
    
  const normFile = (e) => {
    setFormDataYT({...formDataYT, thumbnail:e.fileList});
    return e && e.fileList;
  };
    
  const handleTagChange = (value) => {
    setFormDataYT({...formDataYT, tags: value});
  }
    
  const handleScheduleDate = (e) =>{
    setFormDataYT({...formDataYT, scheduleDate: e._d});
  }
    
  const handleScheduleTime = (e) => {
    setFormDataYT({...formDataYT, scheduleTime: e._d});
  }

  const handleExplicitContent = (value) => {
    setFormDataYT({...formDataYT, selfDeclaredMadeForKids: value});
  }

  const handleCountryChange = (value) => {
    setFormDataYT({...formDataYT, country: value});
  }

  const handleCategoryChange = (value) => {
    setFormDataYT({...formDataYT, category: value});
  }

  const handleLanguageChange = (value) => {
    setFormDataYT({...formDataYT, defaultLanguage: value});
  }

  const handleLicenseChange = (value) => {
    setFormDataYT({...formDataYT, license: value});
  }

  const handlePrivacyStatusChange = (value) => {
    setFormDataYT({...formDataYT, privacyStatus: value});
  }

  const handleStatVisibleChange = (value) => {
    setFormDataYT({...formDataYT, statsVisible: value});
  }

  const handleNotifySubscriberChange = (value) => {
    setFormDataYT({...formDataYT, notifySubscriber: value});
  }

  return (
    <>
      <Form layout="vertical" className="flex flex-column" name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="Video Title"  onChange={handleTitleChange} >
          <Input required />
        </Form.Item>

        <Form.Item name="upload" label="Video Thumbnail" valuePropName="fileList" rules={[{ required: true, message: 'Please upload the video thumbnail!'}]} getValueFromEvent={normFile} extra="Upload you thumbnail">
          <Upload name="thumbnail">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Video Description" name="description" rules={[{required: true, message: 'Please input your video description!'}]} onChange={handleDescriptionChange}>
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item label="Country & Category">
          <Select defaultValue="Select a Country" onChange={handleCountryChange}>
            <Option value="india">India</Option>
            <Option value="others">Others</Option>
          </Select>
          <Select defaultValue="Select a Category" className="mt-30" onChange={handleCategoryChange}>
            <Option value="india">India</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Video Tags" name="videoTags" rules={[{required: true, message: 'Please enter video tags'}]} >
          <Select mode="tags" style={{ width: '100%' }} placeholder="Tags" onChange={handleTagChange} />
        </Form.Item>

        <Form.Item label="Schedule Date & Time" >
          <DatePicker onChange={handleScheduleDate} />
          <TimePicker className="ml-4" minuteStep={10} use12Hours onChange={handleScheduleTime} format="HH:mm" />
        </Form.Item>

        <Form.Item label="Is the video suitable for childerns?">
          <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={handleExplicitContent} />
        </Form.Item>

        <Form.Item label="Default Language">
          <Select defaultValue="en" onChange={handleLanguageChange}>
            <Option value="en">English</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item label="License Information">
          <Select defaultValue="youtube" onChange={handleLicenseChange}>
            <Option value="youtube">Youtube</Option>
            <Option value="creativeCommons">Creative Commons</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Privacy Status">
          <Select defaultValue="public" onChange={handlePrivacyStatusChange}>
            <Option value="public">Public</Option>
            <Option value="private">Private</Option>
            <Option value="unlisted">Unlisted</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Show Satistics Information to Public">
          <Switch defaultChecked checkedChildren="Yes" unCheckedChildren="No" onChange={handleStatVisibleChange} />
        </Form.Item>

        <Form.Item label="Notify Subscriber">
          <Switch defaultChecked checkedChildren="Yes" unCheckedChildren="No" onChange={handleNotifySubscriberChange} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

const mapStateToProps = ({ CreatorYoutube }) => ({
  title: CreatorYoutube.title,
  description: CreatorYoutube.description,
  thumbnail: CreatorYoutube.thumbnail.name,
  tags: CreatorYoutube.tags,
  forChild: CreatorYoutube.selfDeclaredMadeForKids,
  scheduleDate: CreatorYoutube.scheduleDate?.toLocaleDateString(),
  scheduleTime: CreatorYoutube.scheduleTime?.toLocaleTimeString(),
  country: CreatorYoutube.country,
  category: CreatorYoutube.category,
  defaultLanguage: CreatorYoutube.defaultLanguage,
  license: CreatorYoutube.license,
  statsVisible: CreatorYoutube.statsVisible,
  notifySubscriber: CreatorYoutube.notifySubscriber,
  privacyStatus: CreatorYoutube.privacyStatus,
  approvalStatus: CreatorYoutube.approvalStatus,
  uploadStatus: CreatorYoutube.uploadStatus
});

export default connect(mapStateToProps)(YoutubeUploadForm);

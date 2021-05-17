
import './styles.scss';
import { Form, Input, Button, DatePicker, TimePicker} from "antd";
import { useState, useEffect } from 'react';
import { useDispatch, connect} from "react-redux";
import { ACTIONS } from "redux/creators/instagram/actions";

const InstagramUploadForm = ({caption, scheduleDate, scheduleTime, approvalStatus, uploadStatus}) => {

  const defaultIGFormState = {
    caption: caption,
    scheduleDate: scheduleDate,
    scheduleTime: scheduleTime,
    approvalStatus: approvalStatus,
    uploadStatus: uploadStatus
  }  
  
  const [formDataIG, setFormDataYT] = useState(defaultIGFormState);

  const dispatch = useDispatch();

    useEffect(() => {
      dispatch({
        type: ACTIONS.GET_FORM_IG
      });
    }, [dispatch]);
    
  const onFinish = () => {
    try{
      dispatch({
        type: ACTIONS.SET_FORM_IG,
        payload: {...formDataIG}
      });
      alert("Instagram Dispatch Complete");
      }catch(e){
        alert(e);
    }
  };

  const handleCaptionChange = (e) => {
    setFormDataYT({...formDataIG, caption:e.target.value})
  }
    
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
    
  const handleScheduleDate = (e) =>{
    setFormDataYT({...formDataIG, scheduleDate: e._d});
  }
    
  const handleScheduleTime = (e) => {
    setFormDataYT({...formDataIG, scheduleTime: e._d});
  }

  const declineIGForm = () => {
    alert("Youtube Form Declined");
  }

  return (
    <>
      <Form layout="vertical" className="flex flex-column" name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="Caption" name="caption" rules={[{ required: true, message: 'Please input the image caption!'}]} onChange={handleCaptionChange}>
          <Input />
        </Form.Item>

        <Form.Item label="Schedule Date & Time">
          <DatePicker onChange={handleScheduleDate} />
          <TimePicker className="ml-4" minuteStep={10} use12Hours onChange={handleScheduleTime} format="HH:mm" />
        </Form.Item>

        <Form.Item>
          <Button className="mr-10" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button danger type="primary" onClick={declineIGForm}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

const mapStateToProps = ({ CreatorInstagram }) => ({
  caption: CreatorInstagram.caption,
  scheduleDate: CreatorInstagram.scheduleDate?.toLocaleDateString(),
  scheduleTime: CreatorInstagram.scheduleTime?.toLocaleTimeString(),
  approvalStatus: CreatorInstagram.approvalStatus,
  uploadStatus: CreatorInstagram.uploadStatus
});

export default connect(mapStateToProps)(InstagramUploadForm);

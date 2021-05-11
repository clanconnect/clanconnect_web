
import './styles.scss';
import { Modal, Form, Input, Button, Upload, DatePicker, TimePicker, Checkbox, Select, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { useDispatch} from "react-redux";
import { ACTIONS } from "redux/creators/youtube/actions";

const defaultYTFormState = {
  title: "",
  description: "",
  thumbnail: "",
  tags: [],
  selfDeclaredMadeForKids: true,
  scheduleDate: null,
  scheduleTime: null
}

const YoutubeUploadForm = ({show, hide}) => {

    const [formDataYT, setFormDataYT] = useState(defaultYTFormState);
    const dispatch = useDispatch();

    const onFinish = () => {
      dispatch({
          type: ACTIONS.SET_FORM,
          payload: {...formDataYT}
        });
        hide();
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
      const normFile = (e) => {
        setFormDataYT({...formDataYT, thumbnail:e.fileList});
        return e && e.fileList;
      };
    
      const handleTagChange = (value) => {
        setFormDataYT({...formDataYT, tags: value})
      }
    
      const handleScheduleDate = (e) =>{
        setFormDataYT({...formDataYT, scheduleDate: e._d});
      }
    
      const handleScheduleTime = (e) => {
        setFormDataYT({...formDataYT, scheduleTime: e._d});
      }

      const handleExplicitContent = (value) => {
        setFormDataYT({...formDataYT, selfDeclaredMadeForKids: !value});
      }

    return (
        <>
            <Modal
                visible={show}
                onCancel={() => hide}
                width={1100}
                centered
                className="custom-modal"
            >
                <div className="creative-modal">
                <div className="creative-modal-header flex justify-between">
                    <p className="title">Upload on Youtube</p>
                </div>

                <div className="creative-modal-body">
                    <Form layout="vertical" className="flex flex-column" name="basic" initialValues={{remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item label="Video Title" name="title" rules={[{ required: true, message: 'Please input the video title!'}]} onChange={(e)=>{setFormDataYT({...formDataYT, title:e.target.value})}}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="upload" label="Video Thumbnail" valuePropName="fileList" rules={[{ required: true, message: 'Please upload the video thumbnail!'}]} getValueFromEvent={normFile} extra="Upload you thumbnail">
                        <Upload name="thumbnail">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Video Description" name="description" rules={[{required: true, message: 'Please input your video description!'}]} onChange={(e)=>{setFormDataYT({...formDataYT, description:e.target.value})}}>
                        <Input.TextArea rows={5} />
                    </Form.Item>

                    <Form.Item>
                    <Select mode="tags" style={{ width: '100%' }} placeholder="Tags" onChange={handleTagChange} />
                    </Form.Item>

                    <Form.Item label="Schedule Date & Time">
                    <DatePicker onChange={handleScheduleDate} />
                    <TimePicker className="ml-4" use12Hours onChange={handleScheduleTime} format="HH:mm" />
                    </Form.Item>

                    <Form.Item label="Explicit Content">
                    <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={handleExplicitContent} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                        <Button className="ml-4" type="danger" onClick={hide}>
                        Close
                        </Button>
                    </Form.Item>
                    </Form>
                </div>
                </div>
            </Modal>
        </>
    )
}

export default YoutubeUploadForm;

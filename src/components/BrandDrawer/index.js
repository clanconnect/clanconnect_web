import './styles.scss';
import { Button, Descriptions, Divider, Drawer, Select, Tag, Image, Form, Input, List} from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { useDispatch, connect } from "react-redux";
import { ACTIONS } from 'redux/creators/youtube/actions';
import ScheduleEditModal from 'components/ScheduleEditModal';
import { useState } from 'react';

const BrandDrawer = ({isVisible, closeDrawer, title, description, thumbnail, tags, scheduleDate, scheduleTime, comments, isExplicit}) => {

    const [formData, setFormData] = useState({date:scheduleDate, time:scheduleTime})
    const [visible, setVisible] = useState(false);
    
    const { Option } = Select;

    const dispatch = useDispatch();

    const toggleShow = (e) => {
        dispatch({
            type: ACTIONS.GET_FORM_ADMIN
          });
    }

    const submitForms = (e) => {
        console.log(e);
    }

    const onFinish = (e) => {
        console.log(e);
    }
      
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const closeModal = () => {
        setVisible(false);
    }
    
      const showModal = () => {
        setVisible(true);
    }

    const setDateTime = (date, time) => {
        setFormData({...formData, date, time});
    }

    return (
        <>
            <ScheduleEditModal visible={visible} closeModal={closeModal} setDateTime={setDateTime} />
            <Drawer
                title="Schedule your post"
                width={720}
                onClose={closeDrawer}
                visible={isVisible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                    style={{
                        textAlign: 'right',
                    }}
                    >
                    <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    {title !== "" ? <Button onClick={submitForms} type="primary">
                        Approve
                    </Button> : ""}
                    </div>
                }
                >
                <Select defaultValue="Select a Platform" style={{ width: 200 }} onChange={toggleShow}>
                    <Option value="youtube">Youtube</Option>
                    <Option value="instagram">Instagram</Option>
                </Select>
                <Divider orientation="left">Upload Details</Divider>
                { title !== "" ? 
                <>
                    <Descriptions bordered>
                        <Descriptions.Item label="Video Title" span={4}>{title}</Descriptions.Item>
                        <Descriptions.Item label="Video Description" span={4}>{description}</Descriptions.Item>
                        <Descriptions.Item label="Thumbnail" span={4}><Image src="https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png" /></Descriptions.Item>
                        <Descriptions.Item label="Tags" span={4}>
                        {tags?.map((tag)=>{
                            return (
                                <Tag>{tag}</Tag>
                            )
                        })}
                        </Descriptions.Item>
                        <Descriptions.Item label="Explicit Content" span={4}>{isExplicit ? "False" : "True"}</Descriptions.Item>
                        <Descriptions.Item label="Schedule Date" span={2}>{scheduleDate} <EditOutlined onClick={showModal} /> </Descriptions.Item>
                        <Descriptions.Item label="Schedule Time" span={2}>{scheduleTime} <EditOutlined onClick={showModal} /> </Descriptions.Item>
                    </Descriptions>
                    <Divider orientation="left">Add Comment</Divider>
                    <div>{
                        comments?.map((comment)=>{
                            return (
                                <List itemLayout="horizontal">
                                    <List.Item>
                                        {comment}
                                    </List.Item>
                                </List>
                            )
                        })
                    }</div>
                    <Form layout="vertical" className="flex flex-column" name="basic" initialValues={{remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item name="comment">
                            <Input.TextArea rows={2} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                            Add Comment
                            </Button>
                        </Form.Item>
                    </Form>
                </>
                    : "Please Select a platform."
                }
            </Drawer>  
        </>
    )
}

const mapStateToProps = ({ CreatorYoutube }) => ({
    title: CreatorYoutube.title,
    description: CreatorYoutube.description,
    thumbnail: CreatorYoutube.thumbnail.name,
    tags: CreatorYoutube.tags,
    isExplicit: CreatorYoutube.selfDeclaredMadeForKids,
    scheduleDate: CreatorYoutube.scheduleDate?.toLocaleDateString(),
    scheduleTime: CreatorYoutube.scheduleTime?.toLocaleTimeString(),
    comments: CreatorYoutube.comments
  });

export default connect(mapStateToProps)(BrandDrawer);

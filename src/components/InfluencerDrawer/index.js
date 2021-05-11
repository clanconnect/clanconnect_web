import './styles.scss';
import { Button, Descriptions, Divider, Drawer, Select, Tag, Image} from 'antd';
import YoutubeUploadForm from 'components/YoutubeUploadForm';
import { useState, useEffect } from 'react';
import { useDispatch, connect } from "react-redux";
import { ACTIONS } from 'redux/creators/youtube/actions';


const InfluencerDrawer = ({isVisible, closeDrawer, title, description, thumbnail, tags, scheduleDate, scheduleTime, isExplicit}) => {

    const [show, setShow] = useState(false);

    const { Option } = Select;

    const dispatch = useDispatch();

    const toggleShow = (e) => {
        if(e === 'youtube'){
            setShow(true);
        }else if(e === 'instagram'){
            setShow(true);
        }
    }
    const hide = () => {
        setShow(false);
    }

    const submitForms = (e) => {
        console.log(e);
    }

    useEffect(() => {
        dispatch({
          type: ACTIONS.GET_FORM
        });
      }, [dispatch]);

    return (
        <>
            <YoutubeUploadForm show={show} hide={hide} />
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
                        Submit
                    </Button> : ""}
                    </div>
                }
                >
                <Select defaultValue="Select a Platform" style={{ width: 200 }} onChange={toggleShow}>
                    <Option value="youtube">Youtube</Option>
                    <Option value="instagram">Instagram</Option>
                </Select>
                <Divider orientation="left">Upload Details</Divider>
                { title !== "" ? <Descriptions bordered>
                    <Descriptions.Item label="Video Title" span={4}>{title}</Descriptions.Item>
                    <Descriptions.Item label="Video Description" span={4}>{description}</Descriptions.Item>
                    <Descriptions.Item label="Thumbnail" span={4}><Image src="https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png" /></Descriptions.Item>
                    <Descriptions.Item label="Tags" span={4}>
                    {tags.map((tag)=>{
                        return (
                            <Tag>{tag}</Tag>
                        )
                    })}
                    </Descriptions.Item>
                    <Descriptions.Item label="Explicit Content" span={4}>{isExplicit ? "False" : "True"}</Descriptions.Item>
                    <Descriptions.Item label="Schedule Date" span={2}>{scheduleDate}</Descriptions.Item>
                    <Descriptions.Item label="Schedule Time" span={2}>{scheduleTime}</Descriptions.Item>
                </Descriptions> : "Please Select a platform."}
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
    scheduleTime: CreatorYoutube.scheduleTime?.toLocaleTimeString()
  });

export default connect(mapStateToProps)(InfluencerDrawer);
